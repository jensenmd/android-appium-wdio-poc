# Outside Mobile QA POC

A deliberately small, interview-focused Android automation project using Appium, WebdriverIO, TypeScript, and Mocha on Windows 11.

## What it proves

- Starts a real Android app through Appium and UiAutomator2.
- Covers launch, navigation, and back-navigation behavior.
- Captures a screenshot and XML page source automatically on failure.
- Uses environment-based device naming so the same tests can later run on a real device or device cloud.

The test target is Android's built-in Settings app, so no sample APK is required.

## Prerequisites

- Node.js and npm
- Git
- Java JDK 17 or newer
- Android Studio, Android SDK Platform Tools, and an Android emulator
- `JAVA_HOME` and `ANDROID_HOME` configured; Android `platform-tools` and `emulator` available on `PATH`

## Install and run

```powershell
npm install
npx appium driver doctor uiautomator2
npm run appium
```

Leave Appium running. In a second PowerShell window, boot an emulator and verify it appears:

```powershell
adb devices
npm run check
npm run test:smoke
npm test
```

Run only the launch smoke test with `npm run test:smoke`. Type-check without using a device with `npm run check`.

## Failure evidence

Failed tests save a timestamped screenshot (`.png`) and Android UI hierarchy (`.xml`) under `artifacts/`. The folder is ignored by Git because runtime evidence can be large or device-specific.

## Verified result

Validated locally on Windows 11 with an Android 15 / API 35 Medium Phone emulator:

```text
✓ @smoke launches the Settings app
✓ opens Network & internet
✓ supports navigating back to the Settings home screen

3 passing (7.4s)
1 spec file passed
```

The first full run exposed two Android 15 compatibility issues: a heading represented as an accessibility description rather than text, and Settings restoring its previous subpage between tests. The failure screenshot and XML hierarchy identified both causes. After updating the selector and deterministic test reset, the complete suite passed.

Real-device execution, a cloud device provider, parallelization, and CI are intentionally deferred follow-on work.

## Interview talking points

- **Appium** is the automation server translating WebDriver commands into mobile-platform actions.
- **WebdriverIO** is the JavaScript/TypeScript client and test runner that supplies configuration, assertions, hooks, and reporting.
- **UiAutomator2** is the Android-specific Appium driver used to interact with native UI elements.
- Selectors prefer visible user-facing text here for readability, but production tests should favor stable accessibility IDs or resource IDs when the app team controls them.
- One session at a time (`maxInstances: 1`) keeps the local emulator baseline deterministic before adding parallel execution.
- Failure screenshots show what the user saw; page-source XML helps diagnose selector and UI-state problems.
- Device-cloud and CI work comes after local stability, because scaling an unreliable test only produces more noise.

## Known setup status

The local stack is fully operational: Node, npm, Git, JDK 17, Android Studio, Android SDK Platform Tools, Appium 3, UiAutomator2, and an Android 15 emulator. TypeScript validation, the smoke test, and the full three-test suite pass. The production dependency audit reports zero vulnerabilities; npm currently reports advisories in development-only transitive tooling.

## Project status

This repository proves a focused local emulator baseline. It does not claim real-device, device-cloud, or CI coverage yet.

## License

MIT
