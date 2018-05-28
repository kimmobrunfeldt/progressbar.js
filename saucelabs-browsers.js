// Browsers on Sauce Labs
// Check out https://saucelabs.com/platforms for all browser/platform combos
// and https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
module.exports = {

    // Chrome
    sauce_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'OS X 10.9',
        version: '60'
    },

    // Safari
    sauce_safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.12',
        version: '11'
    },

    // Firefox
    sauce_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 10',
        version: '55'
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
