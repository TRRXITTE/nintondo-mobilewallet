# Google Play Store Release Checklist - v0.100.02

## Pre-Release Requirements

### 1. Compliance & Legal ✅
- [x] Privacy Policy created: `PRIVACY_POLICY.md`
- [x] Terms of Service created: `TERMS_OF_SERVICE.md`
- [x] Privacy policy accessible in-app
- [x] Terms of Service accessible in-app
- [ ] GDPR compliance verified
- [ ] No prohibited content

### 2. App Information ✅
- [x] App name: "Nintondo OSX"
- [x] Version: 0.100.02
- [x] Version code: 1
- [x] Package name: io.bluewallet.bluewallet (can be updated)
- [x] Category: Finance
- [x] Content rating: Everyone

### 3. App Store Listing ✅
- [x] Short description created
- [x] Full description created
- [x] Release notes created
- [x] Feature highlights documented
- [ ] Screenshots prepared (need 4-5 high-quality screenshots)
- [ ] Feature graphic prepared (1024x500px)
- [ ] App icon prepared (512x512px)
- [ ] Promotional graphics prepared (optional)

### 4. APK Build & Signing
- [ ] Clean build: `cd android && ./gradlew clean`
- [ ] Build APK: `./gradlew bundleRelease` (for Google Play Bundle)
- [ ] Create keystore: `keytool -genkey -v -keystore android/nintondo-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias nintondo`
- [ ] Sign APK: `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore /Users/traaitt/.keystore android/app/build/outputs/apk/fullMediaCapture/release/app-fullMediaCapture-release.apk googleplay`
- [ ] Verify signature: `jarsigner -verify -verbose android/app/build/outputs/apk/fullMediaCapture/release/app-fullMediaCapture-release-signed.apk`
- [ ] Zipalign APK: `zipalign -v 4 app-fullMediaCapture-release.apk app-fullMediaCapture-release-aligned.apk`

### 5. Testing ✅
- [x] No compilation errors
- [x] All transactions functional
- [x] Currency rates updating
- [x] QR code scanning working
- [ ] Test on physical Android device
- [ ] Test wallet creation and import
- [ ] Test send/receive functionality
- [ ] Test all currency conversions
- [ ] Test offline functionality
- [ ] Check battery usage
- [ ] Verify file size < 100MB

### 6. Security & Privacy ✅
- [x] No hardcoded API keys
- [x] No private key logging
- [x] Encryption enabled for sensitive data
- [x] HTTPS for all API calls
- [ ] Third-party dependency audit
- [ ] Code obfuscation enabled
- [ ] Manifest permissions reviewed

### 7. Performance
- [ ] APK size < 100MB
- [ ] App startup < 3 seconds
- [ ] Transaction loading < 2 seconds
- [ ] Memory usage < 150MB
- [ ] Battery drain acceptable
- [ ] No memory leaks

### 8. Accessibility
- [ ] Text contrast ratios meet WCAG 2.1
- [ ] Touch targets >= 48dp
- [ ] TalkBack support tested
- [ ] Keyboard navigation works

### 9. Device Compatibility
- [ ] Minimum SDK: Android 6.0 (API 23)
- [ ] Target SDK: Latest available
- [ ] Tested on multiple screen sizes
- [ ] Landscape/Portrait modes working
- [ ] Android 14+ compatibility verified

### 10. Google Play Developer Account
- [ ] Account created and verified
- [ ] Payment method added
- [ ] Two-factor authentication enabled
- [ ] Developer profile complete
- [ ] Store listing template prepared

## Build Commands

### Clean Build
```bash
cd /Users/traaitt/Documents/GitHub/nintondo-mobilewallet
cd android
./gradlew clean
```

### Build Bundle (Recommended for Play Store)
```bash
./gradlew bundleRelease
```
Output: `android/app/build/outputs/bundle/fullMediaCaptureRelease/app-fullMediaCapture-release.aab`

### Build APK
```bash
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/fullMediaCapture/release/app-fullMediaCapture-release.apk`

### Sign APK
```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 \
  -keystore /Users/traaitt/.keystore \
  android/app/build/outputs/apk/fullMediaCapture/release/app-fullMediaCapture-release.apk \
  googleplay
```

### Verify Signature
```bash
jarsigner -verify -verbose \
  android/app/build/outputs/apk/fullMediaCapture/release/app-fullMediaCapture-release.apk
```

### Zipalign (Optimize)
```bash
zipalign -v 4 \
  android/app/build/outputs/apk/fullMediaCapture/release/app-fullMediaCapture-release.apk \
  android/app/build/outputs/apk/fullMediaCapture/release/app-fullMediaCapture-release-signed.apk
```

## Upload Instructions

1. **Google Play Console** → `nintondo-mobilewallet` app
2. **Release** → **Closed testing** or **Production**
3. **Create new release**
4. **Upload APK/Bundle**
   - For production: Upload `.aab` (App Bundle)
   - For testing: Upload `.apk`
5. **Add release notes**: Copy from release-notes.md
6. **Review app content rating**
7. **Set rollout percentage** (start with 10-20%)
8. **Review and publish**

## App Store Listing Content

### Title
Nintondo OSX - Dogecoin Wallet

### Short Description
Secure Dogecoin wallet for managing NINTONDO cryptocurrency with ease.

### Full Description
See `PLAY_STORE_METADATA.md`

### Release Notes
See `release-notes.md` or `release-notes.json`

## Support Links

- **Privacy Policy**: https://github.com/[your-repo]/PRIVACY_POLICY.md
- **Terms of Service**: https://github.com/[your-repo]/TERMS_OF_SERVICE.md
- **Website**: https://nintondo.dev (if available)
- **Support Email**: support@nintondo.dev

## Version History

| Version | Date | Status | Notes |
|---------|------|--------|-------|
| 0.100.02 | 2025-12-24 | Ready | Initial Google Play release |
| 7.2.4 | 2024-XX-XX | Legacy | Previous version |

## Important Notes

1. **Keystore Security**: Keep `nintondo-key.keystore` safe and backed up. You'll need it for future updates.
2. **Alias**: All versions must be signed with the same key (alias: `googleplay`)
3. **Version Code**: Increment for each release (currently: 1)
4. **Gradle Deprecation**: Update Gradle to latest to avoid deprecation warnings
5. **Extract Native Libs**: Set `useLegacyPackaging = true` in build.gradle

## Troubleshooting

### Build Fails
```bash
./gradlew clean build --info
```

### APK Not Installing
- Verify signature: `jarsigner -verify -verbose app.apk`
- Check version code is different from installed version
- Clear app cache: `adb shell pm clear io.bluewallet.bluewallet`

### Signing Issues
- Verify keystore: `keytool -list -v -keystore nintondo-key.keystore`
- Check alias exists: `keytool -list -keystore nintondo-key.keystore | grep googleplay`

## Post-Release

- [ ] Monitor crash reports in Google Play Console
- [ ] Monitor user ratings and reviews
- [ ] Respond to user feedback
- [ ] Plan next feature release
- [ ] Document any issues for next update

---

**Last Updated**: December 24, 2025
**Release Manager**: traaitt
**Status**: Ready for Submission
