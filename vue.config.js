const DAY = 60 * 60 * 24;

module.exports = {
  transpileDependencies: [],
  pwa: {
    name: "Weather App",
    themeColor: "#2b6cb0",
    msTileColor: null,
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    iconPaths: {
      faviconSVG: null,
      favicon32: null,
      favicon16: null,
      appleTouchIcon: "apple-touch-icon-180x180.png",
      maskIcon: null,
      msTileImage: null,
    },
    manifestOptions: {
      short_name: "Weather",
      description: "Live weather and 5-day forecast with a sky that matches the weather.",
      background_color: "#2b6cb0",
      icons: [
        { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
        {
          src: "maskable-icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
          handler: "StaleWhileRevalidate",
          options: {
            cacheName: "google-fonts",
            cacheableResponse: { statuses: [0, 200] },
          },
        },
        {
          urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\//,
          handler: "CacheFirst",
          options: {
            cacheName: "cdn-assets",
            cacheableResponse: { statuses: [0, 200] },
            expiration: { maxEntries: 20, maxAgeSeconds: 365 * DAY },
          },
        },
        {
          urlPattern: /^https:\/\/openweathermap\.org\/img\//,
          handler: "CacheFirst",
          options: {
            cacheName: "weather-icons",
            cacheableResponse: { statuses: [0, 200] },
            expiration: { maxEntries: 60, maxAgeSeconds: 30 * DAY },
          },
        },
      ],
    },
  },
};
