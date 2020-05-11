// Browsers on Sauce Labs
// Check out https://saucelabs.com/platforms for all browser/platform combos
// and https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
module.exports = {

    // Chrome
    sauce_chrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'macOS 10.15',
        version: 'latest'
    },

    // Safari
    sauce_safari: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'macOS 10.15',
        version: 'latest'
    },

    // Firefox
    sauce_firefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 10',
        version: 'latest'
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
        version: 'latest'
    },
};
