import { Box, Link as MuiLink, Stack, Typography } from '@mui/material'
import { keyframes, styled } from '@mui/material/styles'
import videoClip from '../assets/video.mov'

const heroFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.06);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const HeroRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  color: theme.palette.text.primary,
  isolation: 'isolate',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: 'url("/hero.webp")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    zIndex: -2,
    opacity: 0,
    transform: 'scale(1.06)',
    animation: `${heroFadeIn} 1100ms ease-out forwards`,
  },
  '@media (max-width:980px)': {
    minHeight: '120vh',
  },
}))

const HeroOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(to bottom, ${theme.custom.colors.black15}, ${theme.custom.colors.overlay} 60%, ${theme.custom.colors.black70})`,
  zIndex: -1,
}))

const HeroBottom = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: theme.custom.layout.insetPage,
  right: theme.custom.layout.insetPage,
  bottom: theme.custom.layout.heroBottomOffset,
  display: 'grid',
  gridTemplateColumns: '1fr 1fr minmax(210px, 340px)',
  alignItems: 'end',
  gap: 'clamp(1rem, 2vw, 2rem)',
  '@media (max-width:980px)': {
    left: 0,
    right: 0,
    bottom: '1rem',
    padding: '0 0.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.45rem',
  },
}))

const BottomBlock = styled(Box)(({ theme }) => ({
  textShadow: theme.custom.shadow.strong,
}))

const MetaText = styled(Typography)(({ theme }) => ({
  margin: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '1rem',
  color: theme.custom.text.muted,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.custom.fontSizes.meta.xs,
  [theme.breakpoints.up('sm')]: {
    fontSize: theme.custom.fontSizes.meta.sm,
  },
  [theme.breakpoints.up('md')]: {
    fontSize: theme.custom.fontSizes.meta.md,
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: theme.custom.fontSizes.meta.lg,
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: theme.custom.fontSizes.meta.xl,
  },
  '@media (max-width:980px)': {
    fontSize: 'clamp(0.82rem, 2.65vw, 1.02rem)',
    gap: '1.15rem',
    justifyContent: 'flex-start',
  },
}))

const VideoPanel = styled(Box)(({ theme }) => ({
  background: theme.custom.colors.panel,
  border: `1px solid ${theme.custom.surface.soft}`,
  borderRadius: theme.custom.radius.sm,
  backdropFilter: 'blur(2px)',
  padding: '0.85rem',
  '@media (max-width:980px)': {
    order: 1,
    width: '95%',
    maxWidth: 'none',
  },
}))

const VideoPreview = styled(Box)(({ theme }) => ({
  height: 'clamp(86px, 11vw, 150px)',
  marginBottom: '0.75rem',
  borderRadius: theme.custom.radius.xs,
  overflow: 'hidden',
  background: theme.palette.background.paper,
  '@media (max-width:980px)': {
    height: 'clamp(210px, 38vw, 320px)',
  },
}))

function Hero() {
  return (
    <HeroRoot component='main' id='hero'>
      <HeroOverlay />

      <HeroBottom component='section'>
        <BottomBlock
          component='article'
          sx={{
            '@media (max-width:980px)': {
              order: 2,
              width: '95%',
              textAlign: 'left',
              px: 'clamp(0.75rem, 4vw, 1.5rem)',
            },
          }}
        >
          <MuiLink
            href='/news'
            sx={(theme) => ({
              display: 'inline-block',
              marginBottom: '0.7rem',
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              fontSize: theme.custom.fontSizes.newsEyebrow.xs,
              [theme.breakpoints.up('sm')]: {
                fontSize: theme.custom.fontSizes.newsEyebrow.sm,
              },
              [theme.breakpoints.up('md')]: {
                fontSize: theme.custom.fontSizes.newsEyebrow.md,
              },
              [theme.breakpoints.up('lg')]: {
                fontSize: theme.custom.fontSizes.newsEyebrow.lg,
              },
              [theme.breakpoints.up('xl')]: {
                fontSize: theme.custom.fontSizes.newsEyebrow.xl,
              },
              fontWeight: 500,
              maxWidth: '24ch',
              textDecoration: 'none',
              transition: `color ${theme.custom.motion.fast}, text-shadow ${theme.custom.motion.fast}`,
              '&:hover': {
                color: theme.palette.primary.main,
                textShadow: theme.custom.glow.purple,
              },
              '@media (max-width:980px)': {
                maxWidth: 'unset',
                fontSize: 'clamp(0.9rem, 3.1vw, 1.2rem)',
                lineHeight: 1.2,
              },
            })}
          >
            WHAT TO EXPECT ON THE DARK FANTASIA TOUR
          </MuiLink>

          <MetaText component='p'>
            <Box component='span' sx={{ color: 'text.primary', fontWeight: 600 }}>
              NEWS
            </Box>
            <Box component='span'>10/4/2025</Box>
          </MetaText>
        </BottomBlock>

        <BottomBlock
          component='article'
          sx={{
            '@media (max-width:980px)': {
              order: 3,
              width: '95%',
              textAlign: 'left',
              px: 'clamp(0.75rem, 4vw, 1.5rem)',
            },
          }}
        >
          <Typography
            component='p'
            sx={(theme) => ({
              margin: '0 0 0.7rem',
              fontFamily: 'inherit',
              fontSize: theme.custom.fontSizes.newsEyebrow.xs,
              [theme.breakpoints.up('sm')]: {
                fontSize: theme.custom.fontSizes.newsEyebrow.sm,
              },
              [theme.breakpoints.up('md')]: {
                fontSize: theme.custom.fontSizes.newsEyebrow.md,
              },
              [theme.breakpoints.up('lg')]: {
                fontSize: theme.custom.fontSizes.newsEyebrow.lg,
              },
              [theme.breakpoints.up('xl')]: {
                fontSize: theme.custom.fontSizes.newsEyebrow.xl,
              },
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.24,
              maxWidth: '27ch',
              '@media (max-width:980px)': {
                maxWidth: 'unset',
                fontSize: 'clamp(0.9rem, 3.1vw, 1.18rem)',
                lineHeight: 1.28,
              },
            })}
          >
            "Masterpieces that shake the soul and ignite the spirit."
          </Typography>

          <MetaText component='p'>
            <Box component='span' sx={{ color: 'text.primary', fontWeight: 500 }}>
              METAL MAGAZINE
            </Box>
            <Box component='span'>12/05/2025</Box>
          </MetaText>
        </BottomBlock>

        <VideoPanel component='article' aria-label='Featured video'>
          <VideoPreview>
            <Box
              component='video'
              src={videoClip}
              autoPlay
              muted
              loop
              playsInline
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </VideoPreview>

          <MetaText component='p'>
            <Stack direction='row' alignItems='center' spacing='0.34rem'>
              <Box
                component='svg'
                viewBox='0 0 24 24'
                aria-hidden='true'
                sx={{ width: '0.86em', height: '0.86em', fill: 'currentColor' }}
              >
                <path d='M8 6.5a1 1 0 0 1 1.52-.86l8.5 5.5a1 1 0 0 1 0 1.72l-8.5 5.5A1 1 0 0 1 8 17.5v-11Z' />
              </Box>
              <Box component='span' sx={{ color: 'text.primary', fontWeight: 600 }}>
                VIDEO
              </Box>
            </Stack>
            <Box component='span'>GHOST TOWN</Box>
          </MetaText>
        </VideoPanel>
      </HeroBottom>
    </HeroRoot>
  )
}

export default Hero
