module.exports = {
  expo: {
    name: 'uber-clone',
    slug: 'uber-clone',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'uberclone',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#2f80ed',
    },
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.jasieloc.uberclone',
    },
    android: {
      adaptiveIcon: {
        backgroundColor: '#E6F4FE',
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundImage: './assets/images/adaptive-icon.png',
        monochromeImage: './assets/images/adaptive-icon.png',
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: 'com.jasieloc.uberclone',
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        },
      },
    },
    web: {
      bundler: 'metro',
      output: 'server',
      favicon: './assets/images/favicon.png',
    },
    plugins: [
      [
        'expo-router',
        {
          origin: 'https://uber-clone.com/',
        },
      ],
      [
        'expo-splash-screen',
        {
          image: './assets/images/splash.png',
          imageWidth: 200,
          resizeMode: 'contain',
          backgroundColor: '#ffffff',
          dark: {
            backgroundColor: '#000000',
          },
        },
      ],
      'expo-web-browser',
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      router: {
        origin: 'https://uber-clone.com/',
      },
      eas: {
        projectId: '0bbe316d-bed3-4252-b614-5f03b15f0a9c',
      },
    },
  },
};
