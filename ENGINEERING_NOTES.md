# Engineering Notes

## Goal

Build and debug a focused native Android automation path locally on Windows 11. Node/npm provide the runtime and dependency management, WebdriverIO provides the runner and assertions, Appium provides the mobile WebDriver server, and UiAutomator2 drives Android.

Android's built-in Settings app removed sample-app distribution from the critical path while still exercising app activation, native element interaction, navigation, assertions, and diagnostic capture.

## Deliberate decisions

- Kept the suite to three checks: Settings home, forward navigation, and back navigation.
- Added a smoke tag for a quick environment check.
- Captured screenshots and page source only after failure to limit storage noise.
- Kept one session at a time while establishing the local baseline.
- Deferred real devices, device clouds, parallel execution, and emulator CI rather than claiming unverified coverage.
- Recorded dependency findings without applying forced, breaking upgrades blindly.

## Debugging record

The first full Android 15 run exposed two test compatibility problems:

1. The destination heading was represented by an accessibility description rather than its text property.
2. Android Settings restored its previous subpage between tests.

The failure screenshot established the visible state, while the XML hierarchy showed `content-desc="Network &amp; internet"` and an empty `text` attribute on the heading container. The assertion was changed to an accessibility selector, and a pre-test reset was added to return Settings to its home screen. The subsequent three-test run passed.

## What this demonstrates

- Standing up the Appium, WebdriverIO, TypeScript, and UiAutomator2 toolchain locally
- Configuring and opening a native Android app
- Writing basic native navigation checks and assertions
- Capturing evidence that shortens selector and state diagnosis
- Improving tests in response to observed device behavior

## What this does not demonstrate

- Production mobile-framework ownership or maintenance
- Testing an organization-owned application
- Real-device, device-cloud, iOS, parallel, or cross-version coverage
- CI execution of an Android emulator suite
- Cold launch, application installation, or lifecycle testing
- Proven long-term stability or flake resistance
