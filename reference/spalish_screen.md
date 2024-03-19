# react-native-splash-screen

A splash screen API for react-native which can programatically hide and show the splash screen. Works on iOS and Android.

## Installation

### First step(Download):

Run `npm i react-native-splash-screen --save`

### Second step(Plugin Installation):

#### Manual installation

**Android:**

1. In your `android/settings.gradle` file, make the following additions:

```java
include ':react-native-splash-screen'
project(':react-native-splash-screen').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-splash-screen/android')
```

2. In your android/app/build.gradle file, add the `:react-native-splash-screen` project as a compile-time dependency:

```java
...
dependencies {
    ...
    implementation project(':react-native-splash-screen')
}
```

3. Update the MainApplication.java file to use `react-native-splash-screen` via the following changes:

```java
import org.devio.rn.splashscreen.SplashScreenReactPackage;
```

### Third step(Plugin Configuration):

Update the `MainActivity.java` to use `react-native-splash-screen` via the following changes:

```java
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;

  override fun getMainComponentName(): String = "Project Name"
     override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    SplashScreen.show(this)
}

```

### Android:

Create a file called `launch_screen.xml` in `app/src/main/res/layout` (create the `layout`-folder if it doesn't exist). The contents of the file should be the following:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:layout_height="match_parent">
    <ImageView android:layout_width="match_parent" android:layout_height="match_parent" android:src="@drawable/launch_screen" android:scaleType="centerCrop" />
</RelativeLayout>
```

Customize your launch screen by creating a `launch_screen.png`-file and placing it in an appropriate `drawable`-folder. Android automatically scales drawable, so you do not necessarily need to provide images for all phone densities.
You can create splash screens in the following folders:

- `drawable-ldpi`
- `drawable-mdpi`
- `drawable-hdpi`
- `drawable-xhdpi`
- `drawable-xxhdpi`
- `drawable-xxxhdpi`

Add a color called `primary_dark` in `app/src/main/res/values/colors.xml`

```
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="primary_dark">#000000</color>
</resources>
```

## Usage

Use like so:

```jsx
//App.jsx

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SplashScreen from "react-native-splash-screen";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 900);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ fontSize: 30 }}>App</Text>
    </SafeAreaView>
  );
};

export default App;
```
