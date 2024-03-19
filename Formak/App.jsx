import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 900);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize: 30}}>App</Text>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
