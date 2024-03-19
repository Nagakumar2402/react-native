import React from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import SignUp from "./src/screen/SignUp";
import BlogPost from "./src/screen/BlogPost";
import SplashScreen from "react-native-splash-screen";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 900);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        {/* <SignUp /> */}
        <BlogPost />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default App;
