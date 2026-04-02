import { Box, Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'

const sitemapLinks = ['Home', 'Music', 'Band', 'Contact']
const updateLinks = ['Events', 'News', 'Store']
const utilityLinks = ['Instructions', 'Styleguide', 'Licensing', 'Change Log']
const linkHrefMap = {
  home: '/#hero',
  music: '/#music',
  band: '/#band',
  contact: '/contact',
  events: '/#events',
  news: '/news',
  store: '/#store',
  instructions: '/#instructions',
  styleguide: '/#styleguide',
  licensing: '/#licensing',
  'change log': '/#change-log',
}

function SocialIcon({ label, path }) {
  return (
    <MuiLink
      href='#'
      aria-label={label}
      sx={(theme) => ({
        display: 'inline-flex',
        color: theme.palette.text.primary,
        transition: `color ${theme.custom.motion.fast}, transform ${theme.custom.motion.fast}`,
        '&:hover': {
          color: theme.palette.primary.main,
          transform: 'translateY(-1px)',
        },
        '& svg': {
          width: '1.7rem',
          height: '1.7rem',
          fill: 'currentColor',
        },
      })}
    >
      <Box component='svg' viewBox='0 0 24 24' aria-hidden='true'>
        <path d={path} />
      </Box>
    </MuiLink>
  )
}

function FooterColumn({ title, links }) {
  return (
    <Box>
      <Typography
        sx={(theme) => ({
          marginBottom: '1rem',
          fontFamily: theme.typography.fontFamily,
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: theme.custom.text.dim80,
        })}
      >
        {title}
      </Typography>

      <Stack spacing={0.85}>
        {links.map((link) => (
          <MuiLink
            key={link}
            href={linkHrefMap[link.toLowerCase()] ?? '/'}
            sx={(theme) => ({
              fontFamily: theme.typography.fontFamily,
              fontSize: '1rem',
              color: theme.palette.text.primary,
              textDecoration: 'none',
              transition: `color ${theme.custom.motion.fast}, text-shadow ${theme.custom.motion.fast}`,
              '&:hover': {
                color: theme.palette.primary.main,
                textShadow: theme.custom.glow.purple,
              },
            })}
          >
            {link}
          </MuiLink>
        ))}
      </Stack>
    </Box>
  )
}

function Footer() {
  return (
    <Box
      component='footer'
      sx={(theme) => ({
        padding: `clamp(3rem, 6vw, 5rem) ${theme.custom.layout.insetSection} clamp(2rem, 4vw, 3rem)`,
        borderTop: `1px solid ${theme.custom.surface.mid}`,
        background:
          'linear-gradient(180deg, rgba(7, 9, 11, 1), rgba(5, 8, 7, 1))',
      })}
    >
      <Box
        sx={(theme) => ({
          width: `min(${theme.custom.layout.contentMax}, 100%)`,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1.35fr) minmax(260px, 0.95fr)',
          },
          columnGap: { xs: 3, md: 4 },
          rowGap: { xs: 4, md: 5 },
        })}
      >
        <Box sx={{ gridColumn: { xs: 'auto', lg: '1' } }}>
          <FooterColumn title='SITEMAP' links={sitemapLinks} />
        </Box>

        <Box sx={{ gridColumn: { xs: 'auto', lg: '2' } }}>
          <FooterColumn title='UPDATES' links={updateLinks} />
        </Box>

        <Box sx={{ gridColumn: { xs: 'auto', lg: '3' } }}>
          <FooterColumn title='UTILITIES' links={utilityLinks} />
        </Box>

        <Box sx={{ gridColumn: { xs: 'auto', lg: '4 / span 2' } }}>
          <Typography
            sx={(theme) => ({
              marginBottom: '1rem',
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: theme.custom.text.dim80,
            })}
          >
            NEWS LETTER
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              width: '100%',
            }}
          >
            <TextField
              fullWidth
              placeholder='Enter Your Email'
              variant='standard'
              sx={{
                width: '100%',
                flex: { xs: '0 1 auto', sm: '1 1 auto' },
                minWidth: 0,
              }}
              InputProps={{
                disableUnderline: false,
                sx: (theme) => ({
                  color: theme.palette.text.primary,
                  fontFamily: theme.typography.fontFamily,
                  '&::before': {
                    borderBottomColor: theme.custom.surface.strong,
                  },
                  '&::after': {
                    borderBottomColor: theme.palette.primary.main,
                  },
                  '&:hover:not(.Mui-disabled, .Mui-error)::before': {
                    borderBottomColor: theme.palette.primary.main,
                  },
                  '& input': {
                    px: 0,
                    pb: 0.6,
                    pt: 0.2,
                  },
                  '& input::placeholder': {
                    color: theme.custom.text.muted,
                    opacity: 1,
                  },
                }),
              }}
            />
            <Button
              variant='outlined'
              sx={(theme) => ({
                minWidth: { xs: '100%', sm: 'auto' },
                flexShrink: 0,
                color: theme.palette.text.primary,
                borderColor: theme.custom.surface.strong,
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: theme.custom.radius.md,
                px: 1.35,
                py: 0.72,
                fontFamily: theme.typography.fontFamily,
                fontWeight: 600,
                letterSpacing: '0.05em',
                '&:hover': {
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main,
                  backgroundColor: 'rgba(138, 92, 195, 0.08)',
                },
              })}
            >
              SUBMIT
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            gridColumn: { xs: 'auto', lg: '5' },
            gridRow: { xs: 'auto', lg: '2' },
            display: 'flex',
            alignItems: { xs: 'flex-start', lg: 'flex-end' },
            justifyContent: { xs: 'flex-start', lg: 'flex-end' },
          }}
        >
          <Box
            component='img'
            src='/logo.webp'
            alt='Dark Fantasia'
            sx={{
              width: { xs: 'min(260px, 72vw)', md: 'min(420px, 34vw)' },
              height: 'auto',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>

        <Box
          sx={{
            gridColumn: { xs: 'auto', lg: '1 / span 4' },
            marginTop: { xs: 3.6, md: 5.2, lg: 1.6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 1.7,
          }}
        >
          <Stack direction='row' spacing={1.6} sx={{ mt: 1.2 }}>
            <SocialIcon
              label='Instagram'
              path='M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 1.8A3.2 3.2 0 0 0 3.8 7v10A3.2 3.2 0 0 0 7 20.2h10a3.2 3.2 0 0 0 3.2-3.2V7A3.2 3.2 0 0 0 17 3.8H7Zm11 1.5a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z'
            />
            <SocialIcon
              label='X'
              path='M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.7L6 22H2.9l7.3-8.4L1 2h6.3l4.4 6L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z'
            />
            <SocialIcon
              label='Facebook'
              path='M12 2a10 10 0 0 0-1.6 19.9v-7h-2.3V12h2.3V9.8c0-2.3 1.3-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.5V12h2.5l-.4 2.9h-2.1v7A10 10 0 0 0 12 2Z'
            />
          </Stack>

          <Typography
            sx={(theme) => ({
              marginTop: '0.8rem',
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.88rem',
              color: theme.custom.text.muted,
            })}
          >
            POWERED BY Stanton Studios
          </Typography>

          <Typography
            sx={(theme) => ({
              marginTop: '0.3rem',
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.78rem',
              letterSpacing: '0.04em',
              color: theme.custom.text.dim80,
              textTransform: 'uppercase',
            })}
          >
            ©2026 Dark Fantasia. ALL RIGHTS RESERVED.
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer
