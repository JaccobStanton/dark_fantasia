import { Box, Button, Link as MuiLink, Stack, TextField, Typography } from '@mui/material'

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
          width: '1.65rem',
          height: '1.65rem',
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

function Contact() {
  return (
    <Box
      component='section'
      id='contact'
      sx={(theme) => ({
        position: 'relative',
        minHeight: '100vh',
        padding: `clamp(6.2rem, 9vw, 8.8rem) ${theme.custom.layout.insetSection} clamp(3.5rem, 6vw, 5rem)`,
        display: 'grid',
        placeItems: 'center',
        scrollMarginTop: '6.5rem',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("/hero.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -2,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(4, 7, 8, 0.54), rgba(5, 8, 7, 0.72) 55%, rgba(5, 8, 7, 0.86))',
          zIndex: -1,
        },
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
            width: 'min(960px, 100%)',
            margin: '0 auto',
            backgroundColor: 'rgba(3, 6, 8, 0.78)',
            border: `1px solid ${theme.custom.surface.soft}`,
            borderRadius: theme.custom.radius.md,
            backdropFilter: 'blur(3px)',
            boxShadow: '0 18px 48px rgba(0, 0, 0, 0.42)',
            padding: 'clamp(1.2rem, 2.8vw, 2rem)',
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1.15fr' },
            gap: { xs: 2.1, md: 2.8 },
          })}
        >
          <Box>
            <Typography
              sx={(theme) => ({
                margin: 0,
                fontFamily: theme.typography.fontFamily,
                fontSize: 'clamp(0.8rem, 1vw, 0.92rem)',
                fontWeight: 600,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: theme.custom.text.muted,
              })}
            >
              Reach Out
            </Typography>

            <Typography
              component='h2'
              sx={(theme) => ({
                margin: '0.35rem 0 0',
                fontFamily: theme.typography.fontFamily,
                fontSize: 'clamp(2.05rem, 5vw, 4rem)',
                fontWeight: 700,
                lineHeight: 0.95,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                color: theme.palette.text.primary,
              })}
            >
              Contact
            </Typography>

            <Stack direction='row' spacing={1.25} sx={{ marginTop: 'clamp(1.2rem, 1.8vw, 1.5rem)' }}>
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

            <Stack spacing={1.8} sx={{ marginTop: 'clamp(1.4rem, 2.3vw, 2.2rem)' }}>
              <Box>
                <Typography
                  sx={(theme) => ({
                    margin: 0,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(0.84rem, 0.95vw, 0.94rem)',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: theme.custom.text.muted,
                  })}
                >
                  Contact
                </Typography>
                <Typography
                  sx={(theme) => ({
                    marginTop: '0.35rem',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(1rem, 1.15vw, 1.16rem)',
                    color: theme.palette.text.primary,
                  })}
                >
                  contact@darkfantasia.music
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={(theme) => ({
                    margin: 0,
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(0.84rem, 0.95vw, 0.94rem)',
                    fontWeight: 600,
                    letterSpacing: '0.07em',
                    textTransform: 'uppercase',
                    color: theme.custom.text.muted,
                  })}
                >
                  Booking
                </Typography>
                <Typography
                  sx={(theme) => ({
                    marginTop: '0.35rem',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(1rem, 1.15vw, 1.16rem)',
                    color: theme.palette.text.primary,
                  })}
                >
                  booking@darkfantasia.music
                </Typography>
              </Box>
            </Stack>
          </Box>

          <Box
            component='form'
            onSubmit={(event) => event.preventDefault()}
            sx={{ alignSelf: 'stretch', display: 'flex', flexDirection: 'column' }}
          >
            <Typography
              component='h3'
              sx={(theme) => ({
                margin: 0,
                fontFamily: theme.typography.fontFamily,
                fontSize: 'clamp(1.75rem, 3.1vw, 2.45rem)',
                fontWeight: 600,
                lineHeight: 1,
                color: theme.palette.text.primary,
              })}
            >
              Say Hello
            </Typography>

            <Stack spacing={1.05} sx={{ marginTop: 'clamp(1rem, 1.8vw, 1.35rem)' }}>
              {['Your name', 'Your email'].map((placeholder) => (
                <TextField
                  key={placeholder}
                  fullWidth
                  placeholder={placeholder}
                  variant='outlined'
                  size='small'
                  InputProps={{
                    sx: (theme) => ({
                      backgroundColor: 'rgba(3, 5, 7, 0.82)',
                      color: theme.palette.text.primary,
                      borderRadius: theme.custom.radius.xs,
                      fontFamily: theme.typography.fontFamily,
                      '& fieldset': {
                        borderColor: theme.custom.surface.soft,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.palette.primary.main,
                      },
                      '& input::placeholder': {
                        color: theme.custom.text.dim72,
                        opacity: 1,
                      },
                    }),
                  }}
                />
              ))}

              <TextField
                fullWidth
                placeholder='Your message'
                variant='outlined'
                multiline
                rows={5}
                InputProps={{
                  sx: (theme) => ({
                    backgroundColor: 'rgba(3, 5, 7, 0.82)',
                    color: theme.palette.text.primary,
                    borderRadius: theme.custom.radius.xs,
                    fontFamily: theme.typography.fontFamily,
                    alignItems: 'flex-start',
                    '& fieldset': {
                      borderColor: theme.custom.surface.soft,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '& textarea::placeholder': {
                      color: theme.custom.text.dim72,
                      opacity: 1,
                    },
                  }),
                }}
              />
            </Stack>

            <Button
              type='submit'
              variant='text'
              sx={(theme) => ({
                marginTop: '1rem',
                alignSelf: 'flex-start',
                padding: 0,
                color: theme.palette.text.primary,
                fontFamily: theme.typography.fontFamily,
                fontSize: 'clamp(0.96rem, 1.05vw, 1.12rem)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: `color ${theme.custom.motion.fast}, text-shadow ${theme.custom.motion.fast}, transform ${theme.custom.motion.fast}`,
                '&:hover': {
                  color: theme.palette.primary.main,
                  textShadow: theme.custom.glow.purple,
                  transform: 'translateX(2px)',
                  backgroundColor: 'transparent',
                },
              })}
            >
              -> Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Contact
