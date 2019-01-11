let webpackConfig = require('../../build/wpk.test.conf')

module.exports = function karmaConfig(config) {
  config.set({
    browsers: [
      'ChromeHeadless',
      'FirefoxHeadless',
      'IE',
    ],
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: [
          '-headless'
        ],
      },
    },
    frameworks: ['mocha'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack']
    },
    // reporters: ['spec', 'coverage'],
    reporters: [
      // 'spec',
      'mocha',
      'coverage',
    ],
    webpack: webpackConfig,
    coverageReporter: {
      dir: './coverage',
      reporters: [{
          type: 'lcov',
          subdir: '.'
        },
        {
          type: 'text-summary'
        }
      ]
    }
  })
}