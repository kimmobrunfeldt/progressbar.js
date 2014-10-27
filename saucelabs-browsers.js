// Browsers on Sauce Labs
// Check out https://saucelabs.com/platforms for all browser/platform combos
module.exports = {

    // Chrome
    sauce_linux_chrome_beta: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'linux',
        version: 'beta'
    },
    sauce_linux_chrome_38: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'linux',
        version: '38'
    },
    sauce_windows_chrome_38: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 8.1',
        version: '38'
    },
    sauce_osx_chrome_38: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'OS X 10.9',
        version: '38'
    },
    sauce_osx_chrome_37: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'OS X 10.9',
        version: '37'
    },
    sauce_osx_chrome_36: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'OS X 10.9',
        version: '36'
    },
    sauce_osx_chrome_35: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'OS X 10.9',
        version: '35'
    },

    // Safari
    sauce_osx_safari7: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.9',
        version: '7'
    },
    sauce_osx_safari6: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.8',
        version: '6'
    },

    // Firefox

    sauce_osx_firefox_beta: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'OS X 10.9',
        version: 'beta'
    },
    sauce_osx_firefox_33: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'OS X 10.9',
        version: '33'
    },
    sauce_osx_firefox_32: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'OS X 10.9',
        version: '32'
    },
    sauce_osx_firefox_31: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'OS X 10.9',
        version: '31'
    },

    sauce_linux_firefox_33: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'linux',
        version: '33'
    },

    sauce_windows_firefox_33: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 8.1',
        version: '33'
    },
    sauce_windows_firefox_32: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 8.1',
        version: '32'
    },
    sauce_windows_firefox_31: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 8.1',
        version: '31'
    },
    sauce_windows_firefox_30: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 8.1',
        version: '30'
    },
    sauce_windows_firefox_29: {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 8.1',
        version: '29'
    },


    // Opera
    sauce_windows_opera_12: {
        base: 'SauceLabs',
        browserName: 'opera',
        platform: 'Windows 7',
        version: '12'
    },
    sauce_windows_opera_11: {
        base: 'SauceLabs',
        browserName: 'opera',
        platform: 'Windows 7',
        version: '11'
    },


    // Internet explorer
    sauce_windows_ie_11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    },
    sauce_windows_ie_10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10'
    },
    sauce_windows_ie_9: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '9'
    },

    // Mobile

    // Android
    sauce_android: {
        base: 'SauceLabs',
        browserName: 'android',
        platform: 'Linux',
        version: '4.4'
    },

    // iOS iPhone
    sauce_ios8_iphone: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.9',
        version: '8.0'
    },
    sauce_ios7_iphone: {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.9',
        version: '7.1'
    },

    // iOS iPad
    sauce_ios8_ipad: {
        base: 'SauceLabs',
        browserName: 'ipad',
        platform: 'OS X 10.9',
        version: '8.0'
    },
    sauce_ios7_ipad: {
        base: 'SauceLabs',
        browserName: 'ipad',
        platform: 'OS X 10.9',
        version: '7.1'
    }
};
