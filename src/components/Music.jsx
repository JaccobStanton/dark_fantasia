import { useEffect, useRef, useState } from 'react'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { keyframes } from '@mui/material/styles'
import albumCover from '../assets/ghost_town.webp'
import albumCoverTwo from '../assets/august_moon.webp'
import recordImage from '../assets/record.png'

const ringSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

function Music() {
  const sectionRef = useRef(null)
  const holdTimeoutRef = useRef(null)
  const holdUntilRef = useRef(0)

  const [cursorCta, setCursorCta] = useState({ active: false, x: 0, y: 0 })
  const [progress, setProgress] = useState(0)
  const [titleDimmed, setTitleDimmed] = useState(false)
  const [showAlbumOneCaption, setShowAlbumOneCaption] = useState(false)
  const [showAlbumTwoCaption, setShowAlbumTwoCaption] = useState(false)
  const isMobile = useMediaQuery('(max-width:900px)')

  const titleDimStart = 0.34

  const albumOneStart = 0.18
  const albumOneCenter = 0.42
  const albumOneVinylStart = 0.46
  const albumOneVinylEnd = 0.58
  const albumOneExitStart = albumOneVinylEnd
  const albumOneExitEnd = 0.66

  const albumTwoStart = 0.56
  const albumTwoCenter = 0.7
  const albumTwoVinylStart = 0.72
  const albumTwoVinylEnd = 0.82

  const rangeProgress = (value, start, end) =>
    Math.min(1, Math.max(0, (value - start) / (end - start)))

  useEffect(() => {
    const updateProgress = () => {
      const section = sectionRef.current
      if (!section) return

      const viewportHeight = window.innerHeight
      const scrollY = window.scrollY
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const maxScroll = document.documentElement.scrollHeight - viewportHeight
      const start = sectionTop - viewportHeight * 0.82
      const rawEnd = sectionTop + sectionHeight - viewportHeight * 0.18
      const end = Math.min(rawEnd, maxScroll)
      const distance = Math.max(1, end - start)
      const next = Math.min(1, Math.max(0, (scrollY - start) / distance))
      setProgress(next)
      if (next >= titleDimStart) {
        setTitleDimmed(true)
      }
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  useEffect(() => {
    const shouldHold = () => Date.now() < holdUntilRef.current

    const onWheel = (event) => {
      if (shouldHold()) event.preventDefault()
    }

    const onTouchMove = (event) => {
      if (shouldHold()) event.preventDefault()
    }

    const onKeyDown = (event) => {
      if (!shouldHold()) return
      const keys = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Space', 'Home', 'End']
      if (keys.includes(event.code) || keys.includes(event.key)) {
        event.preventDefault()
      }
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('keydown', onKeyDown, { passive: false })

    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  const holdViewForAnimation = (duration = 900) => {
    if (holdTimeoutRef.current) {
      window.clearTimeout(holdTimeoutRef.current)
    }
    holdUntilRef.current = Date.now() + duration

    holdTimeoutRef.current = window.setTimeout(() => {
      holdUntilRef.current = 0
      holdTimeoutRef.current = null
    }, duration)
  }

  const albumOneEntry = rangeProgress(progress, albumOneStart, albumOneCenter)
  const albumOneVinyl = isMobile
    ? 0
    : rangeProgress(progress, albumOneVinylStart, albumOneVinylEnd)
  const albumOneExit = rangeProgress(progress, albumOneExitStart, albumOneExitEnd)

  const albumTwoEntry = rangeProgress(progress, albumTwoStart, albumTwoCenter)
  const albumTwoVinyl = isMobile
    ? 0
    : rangeProgress(progress, albumTwoVinylStart, albumTwoVinylEnd)

  const showAlbumOne = progress > albumOneStart && progress < 1
  const showAlbumTwo = progress > albumTwoStart

  const albumOneStageTranslateY = (1 - albumOneEntry) * 120 - albumOneExit * 170
  const albumOneStageScale = 0.72 + albumOneEntry * 0.28
  const albumOneStageOpacity = 0.18 + albumOneEntry * 0.82
  const albumOneRecordTranslate = -7 + albumOneVinyl * 46
  const albumOneRecordRotate = -2 + albumOneVinyl * 8

  const albumTwoStageTranslateY = (1 - albumTwoEntry) * 120
  const albumTwoStageScale = 0.72 + albumTwoEntry * 0.28
  const albumTwoStageOpacity = 0.18 + albumTwoEntry * 0.82
  const albumTwoRecordTranslate = -7 + albumTwoVinyl * 46
  const albumTwoRecordRotate = -2 + albumTwoVinyl * 8

  useEffect(() => {
    if (albumOneEntry >= 0.995 && !showAlbumOneCaption) {
      const timer = window.setTimeout(() => {
        setShowAlbumOneCaption(true)
      }, 180)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [albumOneEntry, showAlbumOneCaption])

  useEffect(() => {
    if (albumTwoEntry >= 0.995 && !showAlbumTwoCaption) {
      const timer = window.setTimeout(() => {
        setShowAlbumTwoCaption(true)
      }, 180)
      return () => window.clearTimeout(timer)
    }
    return undefined
  }, [albumTwoEntry, showAlbumTwoCaption])

  useEffect(() => {
    if (showAlbumOneCaption) {
      holdViewForAnimation(950)
    }
  }, [showAlbumOneCaption])

  useEffect(() => {
    if (showAlbumTwoCaption) {
      holdViewForAnimation(1100)
    }
  }, [showAlbumTwoCaption])

  useEffect(
    () => () => {
      if (holdTimeoutRef.current) {
        window.clearTimeout(holdTimeoutRef.current)
      }
      holdUntilRef.current = 0
    },
    [],
  )

  const showCursorCta = (event) => {
    setCursorCta({
      active: true,
      x: event.clientX,
      y: event.clientY,
    })
  }

  const moveCursorCta = (event) => {
    setCursorCta((prev) =>
      prev.active
        ? {
            ...prev,
            x: event.clientX,
            y: event.clientY,
          }
        : prev,
    )
  }

  const hideCursorCta = () => {
    setCursorCta((prev) => ({ ...prev, active: false }))
  }

  return (
    <Box
      component='section'
      id='music'
      ref={sectionRef}
      sx={(theme) => ({
        marginTop: 'clamp(4rem, 10vw, 10rem)',
        minHeight: '460vh',
        padding: `0 ${theme.custom.layout.insetSection} clamp(18rem, 26vw, 26rem)`,
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
        '@media (max-width:900px)': {
          minHeight: '360vh',
          marginTop: 'clamp(3rem, 8vw, 6rem)',
          paddingBottom: 'clamp(12rem, 22vw, 16rem)',
        },
      })}
    >
      <Box
        sx={(theme) => ({
          position: 'sticky',
          top: '16vh',
          width: `min(${theme.custom.layout.contentMax}, 100%)`,
          margin: '0 auto',
          minHeight: '55vh',
          '@media (max-width:900px)': {
            top: '13vh',
          },
        })}
      >
        <Box
          component='aside'
          aria-hidden='true'
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.8rem',
            '@media (max-width:900px)': {
              left: '0.2rem',
            },
          }}
        >
          <Typography
            sx={(theme) => ({
              margin: 0,
              fontFamily: theme.typography.fontFamily,
              fontSize: 'clamp(0.62rem, 0.9vw, 0.82rem)',
              fontWeight: 600,
              letterSpacing: '0.14em',
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
              color: theme.custom.text.dim80,
            })}
          >
            FEATURED
          </Typography>

          <Box
            sx={(theme) => ({
              width: '2px',
              height: 'clamp(140px, 25vh, 220px)',
              background: theme.custom.surface.faint,
              overflow: 'hidden',
              '@media (max-width:900px)': {
                height: '120px',
              },
            })}
          >
            <Box
              sx={(theme) => ({
                width: '100%',
                height: '100%',
                transformOrigin: 'top',
                background: theme.palette.primary.main,
                transform: `scaleY(${progress})`,
              })}
            />
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            textAlign: 'center',
            paddingTop: 'clamp(2.5rem, 7vh, 7rem)',
            overflow: 'visible',
            minHeight: 'clamp(420px, 70vh, 860px)',
          }}
        >
          <Typography
            component='h2'
            sx={(theme) => ({
              margin: 0,
              fontFamily: theme.typography.fontFamily,
              fontSize: 'clamp(5.8rem, 22vw, 24rem)',
              fontWeight: 100,
              lineHeight: 0.74,
              letterSpacing: '0.012em',
              position: 'relative',
              zIndex: 1,
              opacity: titleDimmed ? 0.08 : 1,
              transition: `opacity ${theme.custom.motion.mid}`,
              '@media (max-width:900px)': {
                fontSize: 'clamp(5rem, 26vw, 16rem)',
                lineHeight: 0.72,
              },
            })}
          >
            MUSIC
          </Typography>

          {showAlbumOne ? (
            <Box
              component='a'
              href='/music/ghost-town'
              aria-label='Open Ghost Town album details'
              onMouseEnter={showCursorCta}
              onMouseMove={moveCursorCta}
              onMouseLeave={hideCursorCta}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 'min(560px, 72vw)',
                aspectRatio: '1 / 1',
                isolation: 'isolate',
                zIndex: 5,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'grab',
                transform: `translate(-50%, -50%) translateY(${albumOneStageTranslateY}%) scale(${albumOneStageScale})`,
                opacity: albumOneStageOpacity,
                '&:active': {
                  cursor: 'grabbing',
                },
                '&:focus-visible': {
                  outline: '2px solid rgba(165, 107, 214, 0.72)',
                  outlineOffset: '6px',
                },
                '@media (max-width:900px)': {
                  width: 'min(320px, 70vw)',
                },
              }}
            >
              {!isMobile ? (
                <Box
                  component='img'
                  src={recordImage}
                  alt='Vinyl record'
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    filter: 'brightness(1.11) contrast(1.03) saturate(1.03)',
                    zIndex: 1,
                    transform: `translate(-50%, -50%) translateX(${albumOneRecordTranslate}%) rotate(${albumOneRecordRotate}deg)`,
                  }}
                />
              ) : null}
              <Box
                sx={(theme) => ({
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  zIndex: 2,
                  width: '50%',
                  height: '72%',
                  transform: 'translate(-50%, -50%) translateX(-10%)',
                  background: theme.palette.background.default,
                })}
              />
              <Box
                component='img'
                src={albumCover}
                alt='Album cover'
                sx={(theme) => ({
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  filter: 'brightness(1.11) contrast(1.03) saturate(1.03)',
                  zIndex: 3,
                  borderRadius: theme.custom.radius.md,
                  border: `0.5px solid ${theme.custom.colors.albumBorder}`,
                })}
              />
              <Typography
                sx={(theme) => ({
                  position: 'absolute',
                  left: 0,
                  bottom: 'clamp(-2.45rem, -2.45rem, -2.45rem)',
                  margin: 0,
                  fontFamily: theme.typography.fontFamily,
                  fontSize: 'clamp(1.15rem, 1.9vw, 1.95rem)',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  color: theme.palette.text.primary,
                  opacity: showAlbumOneCaption ? 1 : 0,
                  transform: showAlbumOneCaption ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity ${theme.custom.motion.mid}, transform ${theme.custom.motion.mid}`,
                  '@media (max-width:900px)': {
                    bottom: '-1.95rem',
                    fontSize: 'clamp(1rem, 3.2vw, 1.55rem)',
                  },
                })}
              >
                Ghost Town
              </Typography>
            </Box>
          ) : null}

          {showAlbumTwo ? (
            <Box
              component='a'
              href='/music/august-moon'
              aria-label='Open August Moon album details'
              onMouseEnter={showCursorCta}
              onMouseMove={moveCursorCta}
              onMouseLeave={hideCursorCta}
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 'min(560px, 72vw)',
                aspectRatio: '1 / 1',
                isolation: 'isolate',
                zIndex: 6,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'grab',
                transform: `translate(-50%, -50%) translateY(${albumTwoStageTranslateY}%) scale(${albumTwoStageScale})`,
                opacity: albumTwoStageOpacity,
                '&:active': {
                  cursor: 'grabbing',
                },
                '&:focus-visible': {
                  outline: '2px solid rgba(165, 107, 214, 0.72)',
                  outlineOffset: '6px',
                },
                '@media (max-width:900px)': {
                  width: 'min(320px, 70vw)',
                },
              }}
            >
              {!isMobile ? (
                <Box
                  component='img'
                  src={recordImage}
                  alt='Vinyl record'
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    filter: 'brightness(1.11) contrast(1.03) saturate(1.03)',
                    zIndex: 1,
                    transform: `translate(-50%, -50%) translateX(${albumTwoRecordTranslate}%) rotate(${albumTwoRecordRotate}deg)`,
                  }}
                />
              ) : null}
              <Box
                sx={(theme) => ({
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  zIndex: 2,
                  width: '50%',
                  height: '72%',
                  transform: 'translate(-50%, -50%) translateX(-10%)',
                  background: theme.palette.background.default,
                })}
              />
              <Box
                component='img'
                src={albumCoverTwo}
                alt='Album cover'
                sx={(theme) => ({
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  filter: 'brightness(1.11) contrast(1.03) saturate(1.03)',
                  zIndex: 3,
                  borderRadius: theme.custom.radius.md,
                  border: `0.5px solid ${theme.custom.colors.albumBorder}`,
                })}
              />
              <Typography
                sx={(theme) => ({
                  position: 'absolute',
                  left: 0,
                  bottom: 'clamp(-2.45rem, -2.45rem, -2.45rem)',
                  margin: 0,
                  fontFamily: theme.typography.fontFamily,
                  fontSize: 'clamp(1.15rem, 1.9vw, 1.95rem)',
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  color: theme.palette.text.primary,
                  opacity: showAlbumTwoCaption ? 1 : 0,
                  transform: showAlbumTwoCaption ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity ${theme.custom.motion.mid}, transform ${theme.custom.motion.mid}`,
                  '@media (max-width:900px)': {
                    bottom: '-1.95rem',
                    fontSize: 'clamp(1rem, 3.2vw, 1.55rem)',
                  },
                })}
              >
                August Moon
              </Typography>
            </Box>
          ) : null}

          <Box
            aria-hidden='true'
            sx={(theme) => ({
              position: 'fixed',
              width: 'clamp(84px, 11vw, 128px)',
              height: 'clamp(84px, 11vw, 128px)',
              transform: `translate(-50%, -50%) scale(${cursorCta.active ? 1 : 0.88})`,
              opacity: cursorCta.active ? 1 : 0,
              zIndex: 30,
              pointerEvents: 'none',
              transition: `opacity ${theme.custom.motion.quick}, transform ${theme.custom.motion.quick}`,
              left: `${cursorCta.x}px`,
              top: `${cursorCta.y}px`,
              '@media (max-width:900px)': {
                width: 'clamp(76px, 18vw, 108px)',
                height: 'clamp(76px, 18vw, 108px)',
              },
            })}
          >
            <Box
              component='svg'
              viewBox='0 0 160 160'
              sx={{ width: '100%', height: '100%', display: 'block', animation: `${ringSpin} 5.6s linear infinite` }}
            >
              <defs>
                <path
                  id='music-cursor-ring-text'
                  d='M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0'
                />
              </defs>
              <path
                fillRule='evenodd'
                fill='var(--df-ring-bg, #fafafa)'
                d='M80 10 A70 70 0 1 1 79.99 10 Z M80 34 A46 46 0 1 0 80 126 A46 46 0 1 0 80 34 Z'
              />
              <text
                style={{
                  fontFamily: 'Anybody, Verdana, sans-serif',
                  fontSize: '9px',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  fill: 'var(--df-ring-text, #101010)',
                }}
              >
                <textPath href='#music-cursor-ring-text' textLength='364' lengthAdjust='spacingAndGlyphs'>
                  VIEW MORE DETAILS • VIEW MORE DETAILS • VIEW MORE DETAILS •
                </textPath>
              </text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Music
