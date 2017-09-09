// Browsers on Sauce Labs
// Check out https://saucelabs.com/platforms for all browser/platform combos
// and https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
module.exports = {

    // Chrome
    sauce_linux_chrome_60: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'linux',
        version: '60'
    },
    sauce_windows_chrome_60: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 8.1',
        version: '60'
    },
    sauce_osx_chrome_60: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'OS X 10.9',
        version: '60'
    },

    // Safari
    sauce_osx_safari10: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.12',
        version: '10'
    },

    // Firefox
    sauce_osx_firefox_beta: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'OS X 10.11',
        version: 'beta'
    },
    sauce_osx_firefox_55: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'OS X 10.9',
        version: '55'
    },

    sauce_linux_firefox_55: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'linux',
        version: '55'
    },

    sauce_windows_firefox_55: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 8.1',
        version: '55'
    },

    // Opera
    sauce_windows_opera_12: {
        base: 'SauceLabs',
        browserName: 'opera',
        platform: 'Windows 7',
        version: '12.12'
    },

    // Internet explorer
    sauce_windows_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 10',
        version: '11'
    },
    sauce_windows_ie_10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8',
        version: '10'
    },

    // MS Edge
    sauce_windows_edge: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
        platform: 'Windows 10',
        version: '20.10240'
    },
};
