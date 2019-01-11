const wpkConfig = require('../../build/wpk.test.conf')

module.exports = config => {
  config.set({
    browsers: [
      'ChromeHeadless',
      'FirefoxHeadless',
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
    reporters: [
      'mocha',
    ].concat(process.env.MODE === 'coverage' ? ['coverage'] : []),
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
    },
    singleRun: process.env.MODE === 'coverage',
    webpack: wpkConfig,
  })
}