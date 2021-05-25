module.exports = api => {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {assets: './assets'},
          extensions: ['.android.js', '.ios.js', '.js', '.jsx'],
        },
      ],
    ],
  };
};
