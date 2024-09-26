build as android
eas build -p android --profile preview


log in adb with real device
adb logcat *:S ReactNative:V ReactNativeJS:V


local build

cd android
.\gradlew clean

release
.\gradlew assembleDebug --stacktrace

.\gradlew assembleRelease
