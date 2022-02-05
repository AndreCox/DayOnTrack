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
    knownEntrypoints: ['@mui/base/', 'react-is', '@mui/base/BackdropUnstyled'],
  },

  devOptions: {
    tailwindConfig: './tailwind.config.js',
  },
  buildOptions: {
    baseUrl: 'https://andrecox.github.io/DayOnTrack',
  },
};
