

const path = require('path');
const _ = require('lodash');

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {

  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /scrollreveal/,
            use: loaders.null(),
          },
          {
            test: /animejs/,
            use: loaders.null(),
          },
          {
            test: /miniraf/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
  
    actions.setWebpackConfig({
      resolve: {
        alias: {
          '@components': path.resolve(__dirname, 'src/components'),
          '@hooks': path.resolve(__dirname, 'src/hooks'),
          '@utils': path.resolve(__dirname, 'src/utils'),
          '@fonts': path.resolve(__dirname, 'src/fonts'),
          '@styles': path.resolve(__dirname, 'src/styles'),
        },
      },
    });
  
    
  };