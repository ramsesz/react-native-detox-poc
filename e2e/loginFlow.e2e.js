const {MOCK_USER} = require('./constants/user');

describe('Login flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    // deletes AsyncStorage
    await device.relaunchApp({delete: true});
  });

  it('should login successfully', async () => {
    await element(by.id('login-input-username')).typeText(MOCK_USER.userName);
    await element(by.id('login-input-password')).typeText(MOCK_USER.password);
    await element(by.id('login-button')).tap();

    await expect(element(by.text('Welcome'))).toBeVisible();
    await expect(element(by.id('login-input-username'))).toNotExist();
  });

  it('should show errors when empty credentials', async () => {
    await expect(element(by.id('login-error'))).toNotExist();
    await element(by.id('login-button')).tap();
    await expect(element(by.id('login-error'))).toBeVisible();
  });
});
