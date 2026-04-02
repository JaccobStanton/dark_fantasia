import { useEffect, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'

function Banner() {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

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
        threshold: 0.24,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      component='section'
      ref={sectionRef}
      sx={(theme) => ({
        position: 'relative',
        overflow: 'hidden',
        padding: `clamp(2rem, 5vw, 3rem) ${theme.custom.layout.insetSection} clamp(4rem, 7vw, 5.5rem)`,
        background:
          'radial-gradient(circle at 18% 22%, rgba(165, 107, 214, 0.12), transparent 32%), linear-gradient(180deg, rgba(12, 14, 18, 0.92), rgba(5, 8, 7, 0.98))',
        borderTop: `1px solid ${theme.custom.surface.mid}`,
        borderBottom: `1px solid ${theme.custom.surface.mid}`,
      })}
    >
      <Box
        sx={(theme) => ({
          position: 'relative',
          width: `min(${theme.custom.layout.contentMax}, 100%)`,
          margin: '0 auto',
          py: { xs: 4, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(34px)',
          transition: 'opacity 620ms ease, transform 720ms cubic-bezier(0.18, 0.9, 0.22, 1)',
        })}
      >
        <Typography
          component='h2'
          sx={(theme) => ({
            margin: 0,
            maxWidth: '17.5ch',
            fontFamily: theme.typography.fontFamily,
            fontSize: 'clamp(1.95rem, 4.75vw, 4.65rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-0.012em',
            textTransform: 'uppercase',
            color: theme.palette.text.primary,
          })}
        >
          FUELING SOUND
          <br />
          WITH CUTTING-EDGE
          <br />
          INTENSITY
        </Typography>

        <Typography
          sx={(theme) => ({
            marginTop: 'clamp(1.25rem, 2vw, 1.8rem)',
            maxWidth: '52ch',
            fontFamily: theme.typography.fontFamily,
            fontSize: 'clamp(0.95rem, 1.25vw, 1.18rem)',
            lineHeight: 1.55,
            color: theme.custom.text.muted,
            textAlign: 'center',
          })}
        >
          Headz shred with raw energy. Indie metal anthems echo rebellion,
          forging intense, electrifying soundscapes.
        </Typography>
      </Box>
    </Box>
  )
}

export default Banner
