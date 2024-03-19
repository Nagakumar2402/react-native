# React-Native CLI QuickSett

> Installing dependencies
> You will need **_Node_** , the React Native command line interface, a **_JDK_**, and **_Android Studio_**.
> We recommend installing Node via [Chocolatey](https://chocolatey.org/install) , a popular package manager for Windows.

With PowerShell, you must ensure Get-ExecutionPolicy is not Restricted. We suggest using Bypass to bypass the policy to get things installed or AllSigned for quite a bit more security.

- Run `Get-ExecutionPolicy`. If it returns **_Restricted_**,
- run `Set-ExecutionPolicy AllSigned` or` Set-ExecutionPolicy Bypass -Scope` Process.

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

if tou check install or not Type `choco `or `choco -?`

Open an **_Administrator Command Prompt_** (right click Command Prompt and select "Run as Administrator"), then run the following command

```powershell
choco install -y nodejs-lts microsoft-openjdk17
```

### 1. Android development environment

Download and install [Android Studio](https://developer.android.com/studio/index.html). While on Android Studio installation wizard, make sure the boxes next to all of the following items are checked:

- Android SDK
- Android SDK Platform
- Android Virtual Device
- If you are not already using Hyper-V: Performance (Intel ® HAXM) (See here for AMD or Hyper-V)

### 2.Install the Android SDK

open Android Studio, click on **_"More Actions"_** button and select **_"SDK Manager"_**.
![Image ](https://reactnative.dev/assets/images/GettingStartedAndroidStudioWelcomeWindows-ce20d1230828a1a26e143e3a4145f1df.png)

Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner.

- Android SDK Platform 34
- Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Finally, click "Apply" to download and install the Android SDK and related build tools

### 3. Configure the ANDROID_HOME environment variable

Open the Windows Control Panel.

1. Click on User Accounts, then click User Accounts again
2. Click on Change my environment variables
3. Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK:
   ![image](https://github.com/Nagakumar2402/react-native/assets/31985534/e63d94bc-b0a1-4840-a3b5-afdb4353e103)

   The SDK is installed, by default, at the following location:

```cmd
%LOCALAPPDATA%\Android\Sdk
```

### 4. Add platform-tools to Path

1. Click on `Change my environment variables`
2. Select the `Path` variable.
3. Click `Edit`.
4. Click `New` and add the path to platform-tools to the list.

```cmd
%LOCALAPPDATA%\Android\Sdk\platform-tools
```

### 5. Configure the JAVA_HOME environment variable

![Screenshot 2024-03-18 230312](https://github.com/Nagakumar2402/react-native/assets/31985534/31c9d412-bcb6-4f0a-9ce3-2d9c9bb7e17e)

## Creating a new application

If you previously installed a global `react-native-cli` package, please remove it as it may cause unexpected issues:

```powershell
npm uninstall -g react-native-cli @react-native-community/cli
```

React Native has a built-in command line interface, which you can use to generate a new project. You can access it without installing anything globally using npx, which ships with Node.js.

```powershell
npx react-native@latest init nagakumar_Project
```

#### [Optional] Using a specific version or template

npx react-native@X.XX.X init AwesomeProject --version X.XX.X

```powershell
npx react-native@X.XX.X init AwesomeProject --version X.XX.X
```

You can also start a project with a custom React Native template with the --template argument.

### Preparing the Android device

You will need an Android device to run your React Native Android app. This can be either a **_physical Android device_** , or more commonly, you can use an **_Android Virtual Device_** which allows you to emulate an Android device on your computer.

## Running your React Native application

#### Step 1: Start Metro

Metro is the JavaScript build tool for React Native. To start the Metro development server, run the following from your project folder:

```powershell
npm start
```

> If you're familiar with web development, Metro is similar to bundlers such as Vite and webpack, but is designed end-to-end for React Native. For instance, Metro uses Babel to transform syntax such as JSX into executable JavaScript.

#### Step 2: Start your application

Let Metro Bundler run in its own terminal. Open a new terminal inside your React Native project folder. Run the following:

```cmd
npm run android
```

If everything is set up correctly, you should see your new app running in your Android emulator shortly.

![Image](https://www.valuebound.com/sites/default/files/inline-images/running_app_on_emulator.jpg)

> **Note** Necessary configurations for your Android project must add below two link of code

1. **Add a line to `gradle.properties` file:**
   Open the `gradle.properties` file located in the `android` directory of your project. If it doesn't exist, create one. Add the following line to this file:

   ```cmd
   org.gradle.warning.mode=all
   ```

   This line enables all warnings for Gradle.

2. **Create `local.properties` file:**
   Inside your project's `android` directory, create a new file named `local.properties`. Open this file and add the following line:
   ```cmd
   sdk.dir=C:\\Users\\<YourUserName>\\AppData\\Local\\Android\\Sdk
   ```
   Replace `<YourUserName>` with your actual Windows username. This line specifies the path to your Android SDK installation directory.
