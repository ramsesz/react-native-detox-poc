const {MOCK_USER} = require('./constants/user');
const {
  startGraphQLServer,
  stopGraphQLServer,
} = require('../serverStartFunctions');

describe('Boxes', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('login-input-username')).typeText(MOCK_USER.userName);
    await element(by.id('login-input-password')).typeText(MOCK_USER.password);
    await element(by.id('login-button')).tap();
  });

  afterEach(async () => {
    await stopGraphQLServer();
  });

  beforeEach(async () => {
    // deletes AsyncStorage
    await device.reloadReactNative();
  });

  it('should be able to open boxes page', async () => {
    await startGraphQLServer();
    await element(by.id('home-screen-button-boxes')).tap();
    await expect(element(by.text('Boxes'))).toBeVisible();

    // titles from mocks
    await expect(element(by.text('Box 1'))).toBeVisible();
    await expect(element(by.text('Box 2'))).toBeVisible();
  });
});
