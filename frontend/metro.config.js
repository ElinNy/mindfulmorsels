const { getDefaultConfig } = require('@expo/metro-config');
const config = getDefaultConfig(__dirname);

// Make sure the bundler uses the "react-native" entry in package.json/exports
config.resolver.unstable_enablePackageExports = false;

// Allow loading CommonJS files (like .cjs) that some Firebase packages use
config.resolver.sourceExts.push('cjs');

module.exports = config;
