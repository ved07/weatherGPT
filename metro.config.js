const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname, { isCSSEnabled: true })

module.exports = withNativeWind({...config, ...{
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
    assetPlugins: ['expo-asset/tools/hashAssetFiles']
  },
  resolver: {
    ...config.resolver,
    assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...config.resolver.sourceExts, "svg"]
  }
}}, { input: './global.css'})