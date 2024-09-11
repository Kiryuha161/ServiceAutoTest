const { setHeadlessWhen, setCommonPlugins, addPlugin } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
  tests: './tests/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://dev.realty.viomitra.ru/',
      show: false,
      restart: false
    },
    REST: {
      defaultHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      endpoint: 'https://dev.realty.viomitra.ru/',
    }
  },
  plugins: {
    coverage: {
      enabled: true,
      debug: true,
      name: 'CodeceptJS Coverage Report',
      outputDir: 'output/coverage'
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'ServiceAutoTest',
  sites: [
    "https://dev.realty.viomitra.ru",
    "https://dev.art.viomitra.ru",
    "https://dev.china.viomitra.ru",
  ],
  localhostSites: [
    "http://localhost:56993"
  ],
  productSites: [
    "https://invest.viomitra.ru",
    "https://art.viomitra.ru",
    "https://china.viomitra.ru"
  ]
};
