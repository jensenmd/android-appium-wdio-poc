# Verified Local Run

## Environment

- Date: August 28, 2026
- Host: Windows 11
- Device: Android 15 / API 35 Medium Phone emulator
- Stack: Appium 3, UiAutomator2, WebdriverIO 9, TypeScript 5.9, Mocha

## Result

```text
✓ @smoke opens the Settings home screen
✓ opens Network & internet
✓ supports navigating back to the Settings home screen

3 passing (7.4s)
1 spec file passed
```

The test names above use the corrected portfolio wording. The original successful run described the smoke check as “launches the Settings app”; the behavior was the same.

## Sanitized diagnostic evidence

During the first full run, the visual heading could not be found through its text property. The captured Android hierarchy showed why:

```xml
<android.widget.FrameLayout
  package="com.android.settings"
  class="android.widget.FrameLayout"
  text=""
  content-desc="Network &amp; internet"
  resource-id="com.android.settings:id/collapsing_toolbar"
  displayed="true" />
```

The assertion was updated to use the accessibility description (`~Network & internet`). A separate observed failure showed that Settings could restore its last subpage, leading to the bounded pre-test back-navigation reset.

The original screenshot and full XML remain untracked because runtime artifacts can contain incidental emulator details. This excerpt retains only the selector evidence relevant to the fix.
