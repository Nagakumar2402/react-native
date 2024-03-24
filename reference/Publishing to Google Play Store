


## [Publishing to Google Play Store](https://reactnative.dev/docs/signed-apk-android)
>**Step 1. Generate a keystore**

You will need a Java generated signing key which is a keystore file used to generate a React Native executable binary for Android. You can create one using the _keytool_ in the terminal with the following command
 ### Windows
On Windows  `keytool`  must be run from  `C:\Program Files\Java\jdkx.x.x_x\bin`, as administrator.
```powershell
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
Once you run the keytool utility, you’ll be prompted to type in a password. *_Make sure you remember the password_
>**Step 2. Adding Keystore to your project**
1.  Place the  `my-upload-key.keystore`  file under the  `android/app`  directory in your project folder.
2.  Edit the file  `~/.gradle/gradle.properties`  or  `android/gradle.properties`, and add the following (replace  `*****`  with the correct keystore password, alias and key password),
```gradle
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```
## Adding signing config to your app's Gradle config

The last configuration step that needs to be done is to setup release builds to be signed using upload key. Edit the file  `android/app/build.gradle`  in your project folder, and add the signing config,
```
android {
    ...
    defaultConfig { ... }
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release 
        }
    }
}
```
>**Step 3. Release APK Generation**

Place your terminal directory to  _android_  using:  
`cd android`

For Windows,  
`gradlew assembleRelease`



As a result,  **the APK creation process is done**. You can find the generated APK at  _android/app/build/outputs/apk/app-release.apk_. This is the actual app, which you can send to your phone or upload to the Google Play Store. Congratulations, you’ve just generated a React Native Release Build APK for Android
