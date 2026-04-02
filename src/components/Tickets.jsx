import { useEffect, useRef, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { keyframes, styled } from '@mui/material/styles'

const events = [
  {
    date: 'April 7, 2026',
    venue: 'The Pageant',
    location: '6161 Delmar Blvd, St. Louis, MO 63112',
  },
  {
    date: 'June 18, 2026',
    venue: 'Delmar Hall',
    location: '6133 Delmar Blvd, St. Louis, MO 63112',
  },
  {
    date: 'August 13, 2026',
    venue: 'Off Broadway',
    location: '3509 Lemp Ave, St. Louis, MO 63118',
  },
  {
    date: 'September 3, 2026',
    venue: 'The Factory',
    location: '17105 N Outer 40 Rd, Chesterfield, MO 63005',
  },
  {
    date: 'September 9, 2026',
    venue: 'Hollywood Casino Amphitheatre',
    location: '14141 Riverport Dr S, Maryland Heights, MO 63043',
  },
  {
    date: 'January 6, 2027',
    venue: 'Stifel Theatre',
    location: '1400 Market St, St. Louis, MO 63103',
  },
]

const titleSpinDown = keyframes`
  0% {
    opacity: 0;
    transform: perspective(900px) rotateX(-80deg) translateY(-18px);
  }
  60% {
    opacity: 1;
    transform: perspective(900px) rotateX(12deg) translateY(0);
  }
  100% {
    opacity: 1;
    transform: perspective(900px) rotateX(0deg) translateY(0);
  }
`

const rowFadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const moreEventsSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Section = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
  borderTop: `1px solid ${theme.custom.colors.sectionBorder}`,
  padding: `clamp(3rem, 6vw, 6rem) ${theme.custom.layout.insetSection} clamp(3.5rem, 6vw, 6rem)`,
}))

const Inner = styled(Box)(({ theme }) => ({
  width: `min(${theme.custom.layout.contentMax}, 100%)`,
  margin: '0 auto',
}))

function Tickets() {
  const titleRef = useRef(null)
  const rowRefs = useRef([])
  const moreBtnRef = useRef(null)

  const [titleVisible, setTitleVisible] = useState(false)
  const [rowsVisible, setRowsVisible] = useState(() => events.map(() => false))
  const [moreVisible, setMoreVisible] = useState(false)
  const [activeRow, setActiveRow] = useState(null)

  useEffect(() => {
    const titleEl = titleRef.current
    const rows = rowRefs.current.filter(Boolean)
    const moreBtnEl = moreBtnRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          const target = entry.target

          if (target === titleEl) {
            setTitleVisible(true)
          } else if (target === moreBtnEl) {
            setMoreVisible(true)
          } else {
            const index = Number(target.getAttribute('data-row-index'))
            if (!Number.isNaN(index)) {
              setRowsVisible((prev) => {
                if (prev[index]) return prev
                const next = [...prev]
                next[index] = true
                return next
              })
            }
          }

          observer.unobserve(target)
        })
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    if (titleEl) observer.observe(titleEl)
    rows.forEach((row) => observer.observe(row))
    if (moreBtnEl) observer.observe(moreBtnEl)

    return () => observer.disconnect()
  }, [])

  return (
    <Section component='section' id='events' aria-label='Upcoming events'>
      <Inner>
        <Typography
          ref={titleRef}
          component='h2'
          sx={(theme) => ({
            margin: '0 0 clamp(1.8rem, 4vw, 3.2rem)',
            fontFamily: theme.typography.fontFamily,
            fontSize: 'clamp(1.45rem, 3.2vw, 2.6rem)',
            fontWeight: 700,
            letterSpacing: '0.02em',
            transformOrigin: 'top center',
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible
              ? 'perspective(900px) rotateX(0deg) translateY(0)'
              : 'perspective(900px) rotateX(-80deg) translateY(-18px)',
            animation: titleVisible
              ? `${titleSpinDown} 750ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards`
              : 'none',
            willChange: 'transform, opacity',
          })}
        >
          UPCOMING EVENTS
        </Typography>

        <Box role='table' aria-label='Tour dates' sx={(theme) => ({ borderBottom: `1px solid ${theme.custom.surface.mid}` })}>
          {events.map((event, i) => {
            const isActive = activeRow === i
            const isVisible = rowsVisible[i]

            return (
              <Box
                key={`${event.date}-${event.venue}`}
                role='row'
                data-row-index={i}
                ref={(el) => {
                  rowRefs.current[i] = el
                }}
                sx={(theme) => ({
                  display: 'grid',
                  gridTemplateColumns: 'minmax(230px, 1.1fr) minmax(220px, 1.2fr) auto',
                  alignItems: 'center',
                  gap: '1.25rem',
                  padding: '1.35rem 0',
                  borderTop: `1px solid ${theme.custom.surface.mid}`,
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(14px)',
                  animation: isVisible ? `${rowFadeUp} 650ms ease forwards` : 'none',
                  animationDelay: isVisible ? `${i * 90}ms` : '0ms',
                  willChange: 'transform, opacity',
                  '@media (max-width:980px)': {
                    gridTemplateColumns: '1fr',
                    gap: '0.85rem',
                  },
                })}
              >
                <Box role='cell' sx={{ minWidth: 0 }}>
                  <Typography
                    component='p'
                    sx={(theme) => ({
                      margin: '0 0 0.15rem',
                      color: isActive ? theme.palette.primary.main : theme.custom.text.dim72,
                      fontFamily: theme.typography.fontFamily,
                      fontSize: 'clamp(0.64rem, 0.85vw, 0.78rem)',
                      fontStyle: 'italic',
                      transition: `color ${theme.custom.motion.fast}`,
                    })}
                  >
                    {event.date}
                  </Typography>

                  <Typography
                    component='p'
                    sx={(theme) => ({
                      margin: 0,
                      color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                      fontFamily: theme.typography.fontFamily,
                      fontSize: 'clamp(1rem, 1.55vw, 1.45rem)',
                      fontWeight: 500,
                      lineHeight: 1.1,
                      transformOrigin: 'left center',
                      transform: isActive ? 'scale(1.04)' : 'scale(1)',
                      transition: `color ${theme.custom.motion.fast}, transform ${theme.custom.motion.fast}`,
                    })}
                  >
                    {event.venue}
                  </Typography>
                </Box>

                <Typography
                  role='cell'
                  component='p'
                  sx={(theme) => ({
                    margin: 0,
                    minWidth: 0,
                    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(0.72rem, 0.95vw, 0.9rem)',
                    lineHeight: 1.24,
                    transformOrigin: 'left center',
                    transform: isActive ? 'scale(1.04)' : 'scale(1)',
                    transition: `color ${theme.custom.motion.fast}, transform ${theme.custom.motion.fast}`,
                  })}
                >
                  {event.location}
                </Typography>

                <Box role='cell' sx={{ justifySelf: { xs: 'start', md: 'end' } }}>
                  <Button
                    type='button'
                    onMouseEnter={() => setActiveRow(i)}
                    onMouseLeave={() => setActiveRow(null)}
                    onFocus={() => setActiveRow(i)}
                    onBlur={() => setActiveRow(null)}
                    sx={(theme) => ({
                      border: `1px solid ${theme.custom.surface.bright}`,
                      background: theme.custom.surface.buttonLight,
                      color: theme.custom.colors.textInk,
                      borderRadius: theme.custom.radius.md,
                      minWidth: 'clamp(90px, 9vw, 140px)',
                      padding: '0.5rem 1rem',
                      fontFamily: theme.typography.fontFamily,
                      fontSize: 'clamp(0.72rem, 0.9vw, 0.86rem)',
                      fontWeight: 600,
                      transition: `color ${theme.custom.motion.fast}, background-color ${theme.custom.motion.fast}, border-color ${theme.custom.motion.fast}, box-shadow ${theme.custom.motion.fast}`,
                      '&:hover, &:focus-visible': {
                        background: theme.custom.tint.purple14,
                        borderColor: theme.palette.primary.main,
                        color: theme.palette.primary.main,
                        boxShadow: theme.custom.glow.purple,
                      },
                    })}
                  >
                    Tickets
                  </Button>
                </Box>
              </Box>
            )
          })}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 'clamp(1.4rem, 3vw, 2.4rem)' }}>
          <Button
            ref={moreBtnRef}
            type='button'
            sx={(theme) => ({
              border: `1px solid ${theme.custom.surface.strong}`,
              background: 'transparent',
              color: theme.palette.text.primary,
              borderRadius: theme.custom.radius.lg,
              padding: 'clamp(0.85rem, 1.2vw, 1.05rem) clamp(1.35rem, 2vw, 1.85rem)',
              minWidth: 'clamp(160px, 18vw, 240px)',
              fontSize: 'clamp(0.86rem, 1.05vw, 1.05rem)',
              fontFamily: theme.typography.fontFamily,
              fontWeight: 700,
              letterSpacing: '0.04em',
              transition: `color ${theme.custom.motion.fast}, border-color ${theme.custom.motion.fast}, box-shadow ${theme.custom.motion.fast}, background-color ${theme.custom.motion.fast}`,
              opacity: moreVisible ? 1 : 0,
              transform: moreVisible ? 'translateY(0)' : 'translateY(18px)',
              animation: moreVisible
                ? `${moreEventsSlideIn} 650ms cubic-bezier(0.2, 0.9, 0.2, 1) forwards`
                : 'none',
              willChange: 'transform, opacity',
              '&:hover, &:focus-visible': {
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main,
                background: theme.custom.tint.purple12,
                boxShadow: theme.custom.glow.purple,
              },
            })}
          >
            MORE EVENTS
          </Button>
        </Box>
      </Inner>
    </Section>
  )
}

export default Tickets
