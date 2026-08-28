import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const artifactRoot = path.resolve('artifacts');

export const config: WebdriverIO.Config = {
  runner: 'local',
  hostname: '127.0.0.1',
  port: 4723,
  path: '/',
  specs: ['./test/specs/**/*.spec.ts'],
  maxInstances: 1,
  capabilities: [{
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME ?? 'Android Emulator',
    'appium:appPackage': 'com.android.settings',
    'appium:appActivity': '.Settings',
    'appium:noReset': true,
    'appium:newCommandTimeout': 120
  }],
  logLevel: 'info',
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { timeout: 60_000 },
  beforeTest: async () => {
    await driver.startActivity('com.android.settings', '.Settings');

    const settingsHomeEntry = () =>
      $('android=new UiSelector().text("Network & internet")');

    // Android may restore the last Settings sub-page even when .Settings is
    // started again. Back out until the home-screen entry is visible so every
    // test begins from a known state.
    for (let attempt = 0; attempt < 3; attempt += 1) {
      if (await settingsHomeEntry().isExisting()) return;
      await browser.back();
    }

    throw new Error('Could not return Android Settings to its home screen');
  },
  afterTest: async (test, _context, result) => {
    if (result.passed) return;
    await mkdir(artifactRoot, { recursive: true });
    const safeName = test.title.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const prefix = path.join(artifactRoot, `${stamp}-${safeName}`);
    await browser.saveScreenshot(`${prefix}.png`);
    await writeFile(`${prefix}.xml`, await browser.getPageSource(), 'utf8');
  }
};
