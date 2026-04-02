import { Box, Typography } from '@mui/material'

const storeImages = Object.entries(
  import.meta.glob('../assets/store/*.webp', { eager: true, import: 'default' }),
)
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([, src]) => src)

const storeCategories = ['ALL PRODUCT', 'VINYL', 'CLOTHING', 'LIMITED', 'PRINT']

const productMeta = [
  { title: 'Nightfall Tour Tee', price: '$38' },
  { title: 'Ghost Town Vinyl', price: '$32' },
  { title: 'Dark Fantasia Hoodie', price: '$72' },
  { title: 'Stage Ruin Longsleeve', price: '$48' },
  { title: 'August Moon LP', price: '$34' },
  { title: 'Ritual Flame Crewneck', price: '$68' },
  { title: 'Tour Noise Cap', price: '$30' },
  { title: 'Static Rebellion Tee', price: '$36' },
  { title: 'Midnight Echo Poster', price: '$24' },
  { title: 'Blackout Patch Set', price: '$18' },
  { title: 'Blood Signal Windbreaker', price: '$84' },
]

function Store() {
  return (
    <Box
      component='section'
      id='store'
      sx={(theme) => ({
        padding: `clamp(4rem, 8vw, 7rem) ${theme.custom.layout.insetSection} clamp(5rem, 9vw, 8rem)`,
        borderTop: `1px solid ${theme.custom.surface.mid}`,
        background:
          'radial-gradient(circle at 18% 16%, rgba(165, 107, 214, 0.08), transparent 28%), linear-gradient(180deg, rgba(5, 8, 7, 1), rgba(7, 9, 11, 1))',
      })}
    >
      <Box
        sx={(theme) => ({
          width: `min(${theme.custom.layout.contentMax}, 100%)`,
          margin: '0 auto',
        })}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', lg: 'flex-end' },
            gap: { xs: 3, lg: 4 },
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <Box
            sx={{
              width: { xs: '100%', lg: 'min(760px, 62%)' },
              flex: { xs: '0 1 auto', lg: '0 1 62%' },
            }}
          >
            <Typography
              sx={(theme) => ({
                margin: 0,
                fontFamily: theme.typography.fontFamily,
                fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: theme.custom.text.dim80,
              })}
            >
              Store
            </Typography>

            <Typography
              component='h2'
              sx={(theme) => ({
                margin: '0.55rem 0 0',
                fontFamily: theme.typography.fontFamily,
                fontSize: 'clamp(2.05rem, 4.9vw, 4.35rem)',
                fontWeight: 700,
                lineHeight: 0.94,
                letterSpacing: '-0.05em',
                textTransform: 'uppercase',
                color: theme.palette.text.primary,
              })}
            >
              ALL THE GOOD STUFF
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'flex-start', lg: 'flex-end' },
              gap: { xs: 0.75, md: 1.05 },
              width: '100%',
              whiteSpace: 'nowrap',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
            }}
          >
            {storeCategories.map((category, index) => (
              <Box
                key={category}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: { xs: 0.75, md: 1.05 },
                  flex: '0 0 auto',
                }}
              >
                <Typography
                  sx={(theme) => ({
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(0.68rem, 0.78vw, 0.84rem)',
                    fontWeight: 600,
                    letterSpacing: '0.11em',
                    textTransform: 'uppercase',
                    color: theme.custom.text.dim80,
                    transition: `color ${theme.custom.motion.fast}, text-shadow ${theme.custom.motion.fast}`,
                    '&:hover': {
                      color: theme.palette.primary.main,
                      textShadow: theme.custom.glow.purple,
                    },
                  })}
                >
                  {category}
                </Typography>

                {index < storeCategories.length - 1 ? (
                  <Typography
                    aria-hidden='true'
                    sx={(theme) => ({
                      fontFamily: theme.typography.fontFamily,
                      fontSize: 'clamp(0.68rem, 0.78vw, 0.84rem)',
                      fontWeight: 500,
                      color: theme.custom.text.dim80,
                    })}
                  >
                    /
                  </Typography>
                ) : null}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={(theme) => ({
            marginTop: 'clamp(1.4rem, 2vw, 2rem)',
            borderBottom: `1px solid ${theme.custom.surface.mid}`,
          })}
        />

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(2, minmax(0, 1fr))',
              md: 'repeat(3, minmax(0, 1fr))',
              xl: 'repeat(4, minmax(0, 1fr))',
            },
            gap: { xs: 2.2, md: 2.8, xl: 3.2 },
            marginTop: 'clamp(1.8rem, 3vw, 2.8rem)',
          }}
        >
          {storeImages.map((src, index) => {
            const product = productMeta[index] ?? {
              title: `Dark Fantasia Drop ${index + 1}`,
              price: '$40',
            }

            return (
              <Box key={src}>
                <Box
                  sx={(theme) => ({
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: theme.custom.radius.md,
                    border: `1px solid ${theme.custom.surface.soft}`,
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    transition: `transform ${theme.custom.motion.mid}, border-color ${theme.custom.motion.mid}, box-shadow ${theme.custom.motion.mid}`,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      borderColor: theme.palette.primary.main,
                      boxShadow: theme.custom.glow.purple,
                    },
                  })}
                >
                  <Box
                    component='img'
                    src={src}
                    alt={product.title}
                    sx={{
                      display: 'block',
                      width: '100%',
                      aspectRatio: '4 / 5',
                      objectFit: 'cover',
                    }}
                  />
                </Box>

                <Typography
                  sx={(theme) => ({
                    marginTop: '0.9rem',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(0.98rem, 1.15vw, 1.12rem)',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    color: theme.palette.text.primary,
                  })}
                >
                  {product.title}
                </Typography>

                <Typography
                  sx={(theme) => ({
                    marginTop: '0.3rem',
                    fontFamily: theme.typography.fontFamily,
                    fontSize: 'clamp(0.8rem, 0.94vw, 0.92rem)',
                    fontWeight: 500,
                    color: theme.custom.text.muted,
                  })}
                >
                  {product.price}
                </Typography>
              </Box>
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default Store
