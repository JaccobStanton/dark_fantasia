import { Box, Button, Typography } from '@mui/material'
import { keyframes } from '@mui/material/styles'
import recordImage from '../assets/record.png'

const ringSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

function DetailMeta({ label, value }) {
  return (
    <Box>
      <Typography
        sx={(theme) => ({
          margin: 0,
          fontFamily: theme.typography.fontFamily,
          fontSize: 'clamp(0.68rem, 0.82vw, 0.82rem)',
          fontWeight: 500,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          color: theme.custom.text.dim72,
        })}
      >
        {label}
      </Typography>
      <Typography
        sx={(theme) => ({
          marginTop: '0.35rem',
          fontFamily: theme.typography.fontFamily,
          fontSize: 'clamp(1.45rem, 2.6vw, 2.5rem)',
          fontWeight: 700,
          lineHeight: 0.98,
          color: theme.palette.text.primary,
          textTransform: 'uppercase',
        })}
      >
        {value}
      </Typography>
    </Box>
  )
}

function ListenBadge({ href }) {
  return (
    <Button
      component='a'
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      variant='text'
      sx={(theme) => ({
        width: 'clamp(124px, 11vw, 170px)',
        height: 'clamp(124px, 11vw, 170px)',
        minWidth: 0,
        borderRadius: '50%',
        padding: 0,
        color: 'var(--df-ring-text, #101010)',
        transition: `transform ${theme.custom.motion.fast}`,
        '&:hover': {
          transform: 'translateY(-2px)',
          backgroundColor: 'transparent',
        },
      })}
      aria-label='Listen'
    >
      <Box
        component='svg'
        viewBox='0 0 160 160'
        sx={{ width: '100%', height: '100%', display: 'block' }}
      >
        <defs>
          <path id='album-listen-ring-text' d='M80,80 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0' />
        </defs>
        <path
          fillRule='evenodd'
          fill='var(--df-ring-bg, #fafafa)'
          d='M80 10 A70 70 0 1 1 79.99 10 Z M80 34 A46 46 0 1 0 80 126 A46 46 0 1 0 80 34 Z'
        />
        <Box
          component='g'
          sx={{
            transformOrigin: '80px 80px',
            animation: `${ringSpin} 6.8s linear infinite`,
          }}
        >
          <text
            style={{
              fontFamily: 'Anybody, Verdana, sans-serif',
              fontSize: '9px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              fill: 'var(--df-ring-text, #101010)',
            }}
          >
            <textPath href='#album-listen-ring-text' textLength='364' lengthAdjust='spacingAndGlyphs'>
              LISTEN • LISTEN • LISTEN • LISTEN • LISTEN •
            </textPath>
          </text>
        </Box>
        <path fill='#ffffff' d='M73 65 L73 95 L99 80 Z' />
      </Box>
    </Button>
  )
}

function AlbumDetailsLayout({
  albumCover,
  albumAlt,
  description,
  format,
  releaseDate,
  musicians,
  availability,
  label,
  listenUrl,
}) {
  return (
    <Box
      component='main'
      sx={(theme) => ({
        minHeight: '100vh',
        padding: `clamp(6.2rem, 9vw, 8.8rem) ${theme.custom.layout.insetSection} clamp(4rem, 7vw, 6rem)`,
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      })}
    >
      <Box
        sx={(theme) => ({
          width: `min(${theme.custom.layout.contentMax}, 100%)`,
          margin: '0 auto',
        })}
      >
        <Box
          sx={(theme) => ({
            width: 'min(590px, 86vw)',
            aspectRatio: '1 / 1',
            margin: '0 auto',
            position: 'relative',
            isolation: 'isolate',
            '@media (max-width:900px)': {
              width: 'min(360px, 84vw)',
            },
          })}
        >
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
              transform: 'translate(-50%, -50%) translateX(44%) rotate(8deg)',
            }}
          />

          <Box
            sx={(theme) => ({
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '54%',
              height: '74%',
              transform: 'translate(-50%, -50%) translateX(-9%)',
              background: theme.palette.background.default,
              zIndex: 2,
            })}
          />

          <Box
            component='img'
            src={albumCover}
            alt={albumAlt}
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
              zIndex: 3,
              borderRadius: theme.custom.radius.md,
              border: `0.5px solid ${theme.custom.colors.albumBorder}`,
            })}
          />
        </Box>

        <Box
          sx={(theme) => ({
            marginTop: 'clamp(2.2rem, 4vw, 3.4rem)',
            borderTop: `1px solid ${theme.custom.surface.soft}`,
            paddingTop: 'clamp(2.1rem, 3.5vw, 3rem)',
          })}
        >
          <Typography
            sx={(theme) => ({
              margin: 0,
              fontFamily: theme.typography.fontFamily,
              fontSize: 'clamp(0.95rem, 1.45vw, 1.45rem)',
              fontWeight: 700,
              letterSpacing: '0.015em',
              textTransform: 'uppercase',
              color: theme.palette.text.primary,
            })}
          >
            Available On
          </Typography>

          <Box
            sx={{
              marginTop: 'clamp(2rem, 4.2vw, 3.1rem)',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '0.9fr 1.5fr' },
              gap: { xs: 2.6, lg: 'clamp(2.2rem, 4vw, 4.2rem)' },
            }}
          >
            <Typography
              sx={(theme) => ({
                margin: 0,
                maxWidth: 'none',
                fontFamily: theme.typography.fontFamily,
                fontSize: 'clamp(1.22rem, 2.2vw, 2.2rem)',
                fontWeight: 400,
                lineHeight: 1.14,
                letterSpacing: '-0.025em',
                color: theme.custom.text.muted,
              })}
            >
              {description}
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                columnGap: { xs: 2, md: 2.6 },
                rowGap: { xs: 2.2, md: 2.8 },
                alignItems: 'start',
              }}
            >
              <DetailMeta label='Format' value={format} />
              <DetailMeta label='Release Date' value={releaseDate} />

              <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
                <Typography
                  sx={(theme) => ({
                    margin: 0,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(0.68rem, 0.82vw, 0.82rem)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: theme.custom.text.dim72,
                  })}
                >
                  Musicians
                </Typography>
                <Typography
                  sx={(theme) => ({
                    marginTop: '0.4rem',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(1.4rem, 2.45vw, 2.4rem)',
                    fontWeight: 700,
                    lineHeight: 1.02,
                    letterSpacing: '-0.02em',
                    textTransform: 'uppercase',
                    color: theme.palette.text.primary,
                  })}
                >
                  {musicians}
                </Typography>
              </Box>

              <DetailMeta label='Availability' value={availability} />
              <DetailMeta label='Label' value={label} />

              <Box
                sx={{
                  gridColumn: { xs: '1', md: '2' },
                  justifySelf: { xs: 'end', md: 'end' },
                  alignSelf: 'end',
                  marginTop: { xs: 1, md: -0.3 },
                }}
              >
                <ListenBadge href={listenUrl} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AlbumDetailsLayout
