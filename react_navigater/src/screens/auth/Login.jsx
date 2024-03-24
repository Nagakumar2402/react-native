import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLOR, ROUTE} from '../../constants';

const Login = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cccccc45',
        width: '100%',
      }}>
      <Image
        source={require('../../assets/logo.png')}
        style={{width: 80, height: 80}}
        borderRadius={50}
        borderColor={COLOR.primary}
        borderWidth={2}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: COLOR.primary,
          marginVertical: 10,
        }}>
        Login in to continue
      </Text>
      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" />
      <TouchableOpacity
        style={styles.btn}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(ROUTE.HOME);
        }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: COLOR.white,
          }}>
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forget}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate(ROUTE.FORGET_PASSWORD, {Password: 'Naga kumar'});
        }}>
        <Text style={styles.forgotPassText}>Forgot Password?</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text style={styles.footerText}> Don't have an account? </Text>
        {/******************** REGISTER BUTTON *********************/}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate(ROUTE.REGISTER);
          }}>
          <Text style={styles.signupBtn}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    width: '90%',
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: COLOR.primary,
    marginBottom: 10,
    borderRadius: 5,
  },
  btn: {
    width: '90%',
    backgroundColor: COLOR.primary,
    marginBottom: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLOR.gray,
    fontWeight: '700',
  },
  signupBtn: {
    color: COLOR.primary,
    fontWeight: '900',
  },
});
