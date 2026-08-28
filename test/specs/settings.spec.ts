import { expect } from '@wdio/globals';

const networkEntry = () =>
  $('android=new UiSelector().text("Network & internet")');

describe('Android Settings', () => {
  it('@smoke opens the Settings home screen', async () => {
    await expect(await browser.getCurrentActivity()).toBe('.Settings');
    await expect($('android=new UiSelector().textContains("Settings")')).toBeDisplayed();
  });

  it('opens Network & internet', async () => {
    await networkEntry().click();
    await expect($('~Network & internet')).toBeDisplayed();
  });

  it('supports navigating back to the Settings home screen', async () => {
    await networkEntry().click();
    await browser.back();
    await expect(networkEntry()).toBeDisplayed();
  });
});
