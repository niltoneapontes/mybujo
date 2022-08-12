module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.svg'],
        alias: {
          '@components': './src/components',
          '@assets': './assets',
          '@tokens': './src/tokens',
        },
      },
    ],
  ],
};
