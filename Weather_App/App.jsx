import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Search from './src/screen/Search';
import Home from './src/screen/Home';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#00aaff" barStyle="dark-content" />
      {/* <Search /> */}
      <Home />
    </SafeAreaView>
  );
};

export default App;
