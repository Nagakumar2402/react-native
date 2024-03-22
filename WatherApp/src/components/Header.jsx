import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>WeatherApp</Text>
      <Icon name="weather-windy-variant" size={25} color="#fff" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00aaff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 5,
  },
  text: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 1,
  },
});
