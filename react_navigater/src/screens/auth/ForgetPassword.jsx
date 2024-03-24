import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
const ForgetPassword = props => {
  const route = useRoute();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>ForgetPassword</Text>
      <Text>Password is :{props.route.params.Password}</Text>
      <Text>Password is :{route.params.Password}</Text>
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({});
