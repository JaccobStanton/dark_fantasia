export function makeComponents(theme) {
  return {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
        disableGutters: true,
      },
    },

    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: 'transparent',
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 78,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: theme.custom.radius.pill,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.01em',
          lineHeight: 1.1,
          transition: `transform ${theme.custom.motion.fast}, background-color ${theme.custom.motion.fast}, border-color ${theme.custom.motion.fast}, box-shadow ${theme.custom.motion.fast}, color ${theme.custom.motion.fast}`,
        },
      },
    },

    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: theme.custom.radius.md,
          backgroundImage: 'none',
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
      },
    },
  }
}
