import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLOR} from '../../constants';

const SettingDetail = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.text}>go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingDetail;

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
});
