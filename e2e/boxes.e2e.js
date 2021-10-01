const {MOCK_USER} = require('./constants/user');
const {
  startGraphQLServer,
  stopGraphQLServer,
} = require('../serverStartFunctions');
const {MOCK_BOXES} = require('../mocks/boxes');

describe('Boxes', () => {
  beforeAll(async () => {
    await device.launchApp();
    await element(by.id('login-input-username')).typeText(MOCK_USER.userName);
    await element(by.id('login-input-password')).typeText(MOCK_USER.password);
    await element(by.id('login-button')).tap();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  afterEach(async () => {
    await stopGraphQLServer();
  });

  it('should list available boxes', async () => {
    await startGraphQLServer();
    await element(by.id('home-screen-button-boxes')).tap();
    await expect(element(by.text('Boxes'))).toBeVisible();

    for (const box of MOCK_BOXES) {
      await expect(element(by.text(box.title))).toBeVisible();
    }
  });

  it('should open box detail page', async () => {
    // Arrange test data
    const MOCK_BOX = {
      id: 1,
      title: 'FakeBox',
    };

    const resolvers = {
      Query: {
        boxes: () => [MOCK_BOX],
        box: () => MOCK_BOX,
      },
    };

    //Overwrite resolvers specific for this test
    await startGraphQLServer({resolvers});

    //Asserts
    await element(by.id('home-screen-button-boxes')).tap();
    await expect(element(by.text(MOCK_BOX.title))).toBeVisible();
    await element(by.text(MOCK_BOX.title)).tap();
    await expect(element(by.id('box-detail-screen-title'))).toBeVisible();
    await expect(element(by.text(MOCK_BOX.title))).toBeVisible();
  });
});
