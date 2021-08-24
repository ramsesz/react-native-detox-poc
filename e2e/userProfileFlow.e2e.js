const {MOCK_USER} = require('./constants/user');

describe('User Profile', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('login-input-username')).typeText(MOCK_USER.userName);
    await element(by.id('login-input-password')).typeText(MOCK_USER.password);
    await element(by.id('login-button')).tap();
  });

  beforeEach(async () => {
    // deletes AsyncStorage
    await device.reloadReactNative();
  });

  it('should be able to open user profile', async () => {
    await element(by.id('home-screen-button-profile')).tap();
    await expect(element(by.text(MOCK_USER.userName))).toBeVisible();
  });
});
