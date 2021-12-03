const ESLintPlugin = require('eslint-webpack-plugin');

let mode = 'development';
let target = 'web';

// set to 'production' via node script
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
  // if in production, use browserslistrc as target. Otherwise, web.
  target = 'browserslist';
}
// "npx tsc --init" => create typescript file
module.exports = {
  entry: ['./src/app.ts'],
  target,
  mode,
  resolve: {
    extensions: [
      '.ts', '.js'
    ],
  },
  module: {
    rules: [{
      test: /\.ts$/i,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
      },
    },
    {
      test: /\.js$/i,
      // memory expensive to runa against all node files
      exclude: /node_modules/,
      // tell webpack to use .babel.rc file, with configs
      use: {
        loader: 'babel-loader',
      },
    },
    ],
  },

  // Normalizes webpack output file, "main.js", for inspection
  // devtool: false,
  devtool: false,
  devServer: {
    // In new Webpack Version, no longer "contentBase" config.
    // Needs relative path
    static: './dist',
    // can add via script, though this method adds flag, adds module to plugin chain
    // injects styles, rather than rendering all CSS, which can speed up development
    hot: true,
  },

  plugins: [new ESLintPlugin({ extensions: 'ts', })],
};
