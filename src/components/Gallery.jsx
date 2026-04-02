import { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { keyframes } from '@mui/material/styles'

const galleryImages = Object.entries(
  import.meta.glob('../assets/gallery/*.webp', { eager: true, import: 'default' }),
)
  .sort(([left], [right]) => {
    const leftNumber = Number(left.match(/(\d+)\.webp$/)?.[1] ?? 0)
    const rightNumber = Number(right.match(/(\d+)\.webp$/)?.[1] ?? 0)
    return leftNumber - rightNumber
  })
  .map(([, src]) => src)

const marqueeDrift = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
`

const topRowLayout = [
  { span: 2 },
  { span: 2 },
  { span: 3 },
  { span: 2 },
  { span: 1 },
  { span: 2 },
]

const bottomRowLayout = [
  { span: 2 },
  { span: 2 },
  { span: 1 },
  { span: 3 },
  { span: 2 },
  { span: 2 },
]

const marqueeItems = Array.from({ length: 8 }, () => 'Dark Fantasia')

function shuffle(list) {
  const next = [...list]

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    ;[next[index], next[swapIndex]] = [next[swapIndex], next[index]]
  }

  return next
}

function pickLayouts(source) {
  return shuffle(source)
}

function GalleryRow({ images, layout, rowHeight }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, minmax(0, 1fr))', md: 'repeat(12, minmax(0, 1fr))' },
        gap: { xs: 0.45, md: 0.55 },
      }}
    >
      {images.map((src, index) => {
        const spec = layout[index % layout.length]

        return (
          <Box
            key={src}
            sx={{
              position: 'relative',
              minWidth: 0,
              gridColumn: { xs: 'span 1', md: `span ${spec.span}` },
              height: { xs: 'clamp(180px, 37vw, 252px)', md: rowHeight },
              overflow: 'hidden',
              borderRadius: '0.55rem',
            }}
          >
            <Box
              component='img'
              src={src}
              alt={`Dark Fantasia gallery ${index + 1}`}
              sx={{
                display: 'block',
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        )
      })}
    </Box>
  )
}

function Gallery() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const [rows] = useState(() => {
    const shuffledImages = shuffle(galleryImages)
    return {
      topImages: shuffledImages.slice(0, 6),
      bottomImages: shuffledImages.slice(6, 12),
      topLayout: pickLayouts(topRowLayout),
      bottomLayout: pickLayouts(bottomRowLayout),
    }
  })

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px',
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      component='section'
      id='gallery'
      ref={sectionRef}
      sx={{
        position: 'relative',
        marginTop: 0,
        paddingBottom: 0,
      }}
    >
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
          transform: isVisible ? 'translateY(0)' : 'translateY(140px)',
          opacity: isVisible ? 1 : 0,
          transition: 'transform 820ms cubic-bezier(0.18, 0.85, 0.22, 1), opacity 540ms ease',
        }}
      >
        <Box sx={{ px: { xs: 0.2, md: 0.25 } }}>
          <GalleryRow
            images={rows.topImages}
            layout={rows.topLayout}
            rowHeight='clamp(210px, 18vw, 320px)'
          />
        </Box>

        <Box
          sx={(theme) => ({
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            overflow: 'hidden',
            marginTop: { xs: 0.55, md: 0.65 },
            marginBottom: { xs: 0.55, md: 0.65 },
            py: { xs: 0.8, md: 1 },
            backgroundColor: theme.palette.background.default,
          })}
        >
          <Box
            sx={{
              display: 'flex',
              width: 'max-content',
              animation: `${marqueeDrift} 18s linear infinite`,
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <Typography
                key={`${item}-${index}`}
                sx={(theme) => ({
                  px: { xs: 1.8, md: 2.6 },
                  whiteSpace: 'nowrap',
                  fontFamily: theme.typography.fontFamily,
                  fontSize: 'clamp(1.6rem, 2.7vw, 2.55rem)',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: theme.palette.text.primary,
                  opacity: 0.98,
                })}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>

        <Box sx={{ px: { xs: 0.2, md: 0.25 } }}>
          <GalleryRow
            images={rows.bottomImages}
            layout={rows.bottomLayout}
            rowHeight='clamp(210px, 18vw, 320px)'
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Gallery
