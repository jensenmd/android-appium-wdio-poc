# Interview Sprint Notes

## Story so far

I stood up a small native Android automation stack locally on Windows 11. Node/npm provide the runtime and dependency management; WebdriverIO provides the runner and assertions; Appium provides the mobile WebDriver server; UiAutomator2 drives Android.

I intentionally targeted Android's built-in Settings app. That removed sample-app distribution from the critical path while still proving app launch, native element interaction, navigation, assertions, and diagnostic artifacts.

## Decisions I can explain

- Kept the suite to three behaviors: launch, forward navigation, and back navigation.
- Added a smoke tag for rapid health checks.
- Captured screenshot plus page source only on failure to balance evidence with storage noise.
- Deferred real devices, device clouds, parallelism, and CI until the emulator baseline is trustworthy.
- Did not hide dependency audit findings or blindly apply forced upgrades; upgrades should be assessed and regression-tested.

## Vocabulary

- **Capability:** Session configuration describing the platform, automation engine, device, and app.
- **Appium driver:** Platform adapter; UiAutomator2 is used for Android.
- **Selector:** Strategy for finding a UI element. Accessibility/resource IDs are generally more stable than text or XPath.
- **Flakiness:** A test producing inconsistent outcomes without a relevant product change. Common causes include timing, shared state, animation, network variability, and device differences.
- **Failure artifact:** Evidence such as screenshots, logs, video, or page source collected to shorten diagnosis time.

## Verified milestone

The local Android automation path is verified end to end. On an Android 15 / API 35 Medium Phone emulator, the smoke test passed and the full suite produced three passing tests with no failures. The run exercised TypeScript, WebdriverIO, Appium 3, UiAutomator2, `adb`, the emulator, and the native Android Settings app.

The first full run exposed two genuine Android-version compatibility issues rather than infrastructure failures. Android 15 exposed the destination heading through an accessibility description instead of the text property, and Settings restored its previous subpage between tests. The automatically captured screenshot and XML hierarchy revealed both causes. I changed the assertion to use an accessibility selector and added a deterministic pre-test reset that returns Settings to its home screen. The next run passed all three tests.

This is useful interview evidence because the framework did more than execute a happy path: it produced diagnostic artifacts, supported root-cause analysis, and was improved based on observed device behavior.

## Concise interview result

> I built and validated a local Android automation proof of concept on the target stack. The complete suite passes, and its failure artifacts helped me diagnose and correct two Android 15 compatibility issues during the first full run.
