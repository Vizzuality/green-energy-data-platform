module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en', 'cn'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
    localeDetection: true,
  },
  webpack(config) {
    // eslint-disable-next-line no-param-reassign
    config.resolve.alias = {
      ...config?.resolve?.alias,
      'mapbox-gl': 'maplibre-gl',
    };
    return config;
  },
};
