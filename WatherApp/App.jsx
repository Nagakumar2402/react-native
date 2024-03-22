import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Search from './src/screen/Search';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#00aaff" barStyle="dark-content" />
      <Search />
    </SafeAreaView>
  );
};

export default App;
