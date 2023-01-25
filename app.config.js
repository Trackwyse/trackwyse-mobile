const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
    name: IS_DEV ? "Trackwyse (DEV)" :"Trackwyse",
    slug: "trackwyse",
    scheme: "trw",
    version: "1.2.2",
    orientation: "portrait",
    icon: IS_DEV ? "./assets/icon-dev.png" :"./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: IS_DEV ? "./assets/splash-dev.png" :"./assets/splash.png", 
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: IS_DEV ? "dev.js00001.trackwyse" :"com.js00001.trackwyse",
      buildNumber: "1.2.2",
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        LSApplicationQueriesSchemes: [
          'comgooglemaps'
        ]
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "1dfd6eca-ffee-4132-bb86-20c878ffabfa"
      },
      stripe: {
        // ADd a production key here later
        publicKey: "pk_test_51LKPLLLRrR4p45sTnKwSJkz7qOUtms6B8T3mPxxslSAR52R7EYRx2U3lkJEF8PvcvTowrvxk68annvd222YRf7uJ00QFVKAox"
      },
      posthog: {
        publicKey: "phc_AkDMJVw4fkcAjjGrWRclPzYIfnwEJLvOjQJwg2FxncU"
      }
    },
    owner: "js00001"
}
