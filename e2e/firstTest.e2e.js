/* eslint-disable no-undef */

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('home-screen'))).toBeVisible();
  });

  it('should show profile screen after tap', async () => {
    await element(by.id('home-screen-button-profile')).tap();
    await expect(element(by.text("This is Jane's profile"))).toBeVisible();
  });
});
