import { Box, Button, TextField, Typography } from '@mui/material'

function Newsletter() {
  return (
    <Box
      component='section'
      sx={(theme) => ({
        padding: `clamp(4rem, 8vw, 6rem) ${theme.custom.layout.insetSection}`,
        borderTop: `1px solid ${theme.custom.surface.mid}`,
        background:
          'radial-gradient(circle at center, rgba(165, 107, 214, 0.08), transparent 36%), linear-gradient(180deg, rgba(5, 8, 7, 0.98), rgba(5, 8, 7, 1))',
      })}
    >
      <Box
        sx={{
          width: `min(860px, 100%)`,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <Typography
          component='h2'
          sx={(theme) => ({
            margin: 0,
            fontFamily: theme.typography.fontFamily,
            fontSize: 'clamp(2.4rem, 6vw, 5.8rem)',
            fontWeight: 700,
            lineHeight: 0.94,
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
          })}
        >
          NEVER MISS WHAT&apos;S NEXT
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            gap: { xs: 1.45, sm: 1.8 },
            width: '100%',
            maxWidth: '720px',
            margin: 'clamp(1.5rem, 3vw, 2rem) auto 0',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <TextField
            fullWidth
            placeholder='Enter Your Email'
            variant='outlined'
            InputProps={{
              sx: (theme) => ({
                minHeight: 58,
                borderRadius: theme.custom.radius.lg,
                backgroundColor: 'rgba(255,255,255,0.04)',
                color: theme.palette.text.primary,
                fontFamily: theme.typography.fontFamily,
                '& fieldset': {
                  borderColor: theme.custom.surface.strong,
                },
                '&:hover fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '& input::placeholder': {
                  color: theme.custom.text.muted,
                  opacity: 1,
                },
              }),
            }}
          />
          <Button
            variant='contained'
            sx={(theme) => ({
              minWidth: { xs: '100%', sm: 180 },
              minHeight: 58,
              borderRadius: theme.custom.radius.lg,
              backgroundColor: theme.palette.text.primary,
              color: theme.custom.colors.textInk,
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.96rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
                boxShadow: theme.custom.glow.purple,
              },
            })}
          >
            SUBMIT
          </Button>
        </Box>

        <Typography
          sx={(theme) => ({
            marginTop: '1rem',
            maxWidth: '62ch',
            mx: 'auto',
            fontFamily: theme.typography.fontFamily,
            fontSize: '0.86rem',
            lineHeight: 1.6,
            color: theme.custom.text.muted,
          })}
        >
          By submitting your email, you’ll be the first to know about upcoming
          updates. You can unsubscribe at any time.
        </Typography>
      </Box>
    </Box>
  )
}

export default Newsletter
