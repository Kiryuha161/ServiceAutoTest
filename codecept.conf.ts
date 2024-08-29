import { setHeadlessWhen, setCommonPlugins } from '@codeceptjs/configure';
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

export const config: CodeceptJS.MainConfig = {
  tests: './tests/*_test.ts',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://dev.realty.viomitra.ru/',
      show: false,
      restart: true
    },
    REST: {
      endpoint: 'https://dev.realty.viomitra.ru/', 
    },
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
}