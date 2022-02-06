/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: '/', static: true, dot: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    ['@snowpack/plugin-sass', {}],
    '@snowpack/plugin-postcss',
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    knownEntrypoints: [
      '@mui/base/ModalUnstyled',
      '@mui/base/BackdropUnstyled',
      '@mui/base/composeClasses',
      'react-is',
      '@mui/base',
      '@mui/material/Dialog',
      '@mui/material/Paper',
      '@mui/material/Popper',
      '@mui/material/Unstable_TrapFocus',
      '@mui/material/useMediaQuery',
      '@mui/material/Grid',
      '@mui/material/ButtonBase',
      '@mui/material/Fade',
      '@mui/material/DialogActions',
      '@mui/material/DialogContent',
      '@mui/material/InputAdornment',
    ],
  },

  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  buildOptions: {
    baseUrl: 'https://andrecox.github.io/DayOnTrack',
  },
};
