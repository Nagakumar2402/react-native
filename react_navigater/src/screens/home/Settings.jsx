import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLOR, ROUTE} from '../../constants';

const Settings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate(ROUTE.SETTING_DETAILS)}>
        <Text style={styles.text}>go to Setting Details</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logout}
        onPress={() => navigation.navigate(ROUTE.LOGIN)}>
        <Text style={styles.text}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: COLOR.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  text: {
    color: 'white',
    textTransform: 'capitalize',
  },
  logout: {
    backgroundColor: COLOR.gradientForm,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
