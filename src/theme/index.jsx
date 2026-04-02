import * as React from 'react'
import { CssBaseline, GlobalStyles } from '@mui/material'
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles'
import { makeComponents } from './components'
import { brand, breakpoints, radii, spacing, typeScale } from './tokens'

function buildTheme(mode = 'dark') {
  const base = createTheme({
    palette: {
      mode,
      primary: {
        main: brand.purple[400],
        light: brand.purple[300],
        dark: brand.purple[600],
        contrastText: '#f2f2f2',
      },
      background: {
        default: brand.ink[950],
        paper: brand.ink[900],
      },
      text: {
        primary: brand.text.primary,
        secondary: brand.text.muted,
      },
      divider: brand.surfaces.borderMid,
    },
    breakpoints,
    shape: {
      borderRadius: radii.md,
    },
    spacing: 4,
    typography: {
      fontFamily: "'Anybody', Verdana, sans-serif",
      button: {
        fontWeight: 600,
      },
      h1: {
        fontWeight: 600,
        letterSpacing: '-0.02em',
      },
      body1: {
        lineHeight: 1.5,
      },
    },
  })

  let theme = createTheme(base, {
    custom: {
      colors: {
        overlay: 'rgba(2, 8, 8, 0.28)',
        panel: brand.surfaces.panel,
        navBorder: '#797979',
        sectionBorder: '#6f6f6f',
        accent: '#ec5757',
        textInk: '#141414',
        black15: 'rgba(0, 0, 0, 0.15)',
        black70: 'rgba(0, 0, 0, 0.7)',
        black97: 'rgba(0, 0, 0, 0.97)',
        ringBg: '#fafafa',
        ringText: '#101010',
        albumBorder: '#303030',
      },
      surface: {
        soft: brand.surfaces.borderSoft,
        mid: brand.surfaces.borderMid,
        strong: brand.surfaces.borderStrong,
        stronger: brand.surfaces.borderStronger,
        bright: brand.surfaces.borderBright,
        faint: brand.surfaces.fillFaint,
        buttonLight: 'rgba(245, 245, 245, 0.95)',
      },
      text: {
        muted: brand.text.muted,
        dim80: brand.text.dim80,
        dim72: brand.text.dim72,
      },
      glow: {
        purple: '0 0 8px rgba(62, 22, 92, 0.95), 0 0 18px rgba(35, 10, 54, 0.88)',
      },
      shadow: {
        strong: '0 2px 8px rgba(0, 0, 0, 0.5)',
      },
      tint: {
        purple12: 'rgba(165, 107, 214, 0.12)',
        purple14: 'rgba(165, 107, 214, 0.14)',
      },
      focus: {
        outline: 'rgba(165, 107, 214, 0.7)',
      },
      radius: {
        xs: '0.3rem',
        sm: '0.45rem',
        md: '0.5rem',
        lg: '0.65rem',
        pill: '999px',
      },
      layout: {
        contentMax: '1280px',
        insetPage: 'clamp(1rem, 3vw, 4rem)',
        insetSection: 'clamp(1rem, 4vw, 4rem)',
        heroBottomOffset: 'clamp(1rem, 2vw, 2rem)',
      },
      motion: {
        fast: '180ms ease',
        mid: '260ms ease',
        quick: '150ms ease',
        menu: '220ms ease',
        navBg: '100ms linear',
        overlayOpen: '360ms ease',
        overlayFade: '280ms ease',
        overlayItem: '340ms ease',
      },
      fontSizes: {
        logo: typeScale.logo,
        nav: typeScale.nav,
        cartCount: typeScale.cartCount,
        newsEyebrow: typeScale.newsEyebrow,
        meta: typeScale.meta,
      },
      spacing,
      radii,
    },
  })

  theme = createTheme(theme, {
    components: makeComponents(theme),
  })

  theme = responsiveFontSizes(theme, { factor: 2.3 })
  return theme
}

function GlobalThemeStyles() {
  return (
    <GlobalStyles
      styles={(theme) => ({
        '@font-face': [
          {
            fontFamily: 'Anybody',
            src: 'url("/Anybody.woff2") format("woff2"), url("/Anybody.ttf") format("truetype")',
            fontDisplay: 'swap',
          },
        ],
        '*, *::before, *::after': {
          boxSizing: 'border-box',
        },
        ':root': {
          '--purple-hover': theme.palette.primary.main,
          '--df-glow-purple': theme.custom.glow.purple,
          '--df-content-max': theme.custom.layout.contentMax,
          '--df-inset-page': theme.custom.layout.insetPage,
          '--df-inset-section': theme.custom.layout.insetSection,
          '--df-ring-bg': theme.custom.colors.ringBg,
          '--df-ring-text': theme.custom.colors.ringText,
        },
        html: {
          scrollBehavior: 'smooth',
        },
        'html, body, #root': {
          minHeight: '100%',
        },
        body: {
          margin: 0,
          minWidth: 320,
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
        },
        a: {
          color: 'inherit',
          textDecoration: 'none',
        },
        p: {
          margin: 0,
        },
        button: {
          font: 'inherit',
        },
      })}
    />
  )
}

export function AppThemeProvider({ children }) {
  const theme = React.useMemo(() => buildTheme('dark'), [])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalThemeStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  )
}
