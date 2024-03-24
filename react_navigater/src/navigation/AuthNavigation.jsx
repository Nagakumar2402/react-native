import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login, Resister, ForgetPassword} from '../screens';
import {ROUTE, COLOR} from '../constants';
const Stack = createNativeStackNavigator();
import BottomTabNavigation from './BottomTabNavigation';
import DrawerNav from './DrawerNav';
const AuthNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: COLOR.primary},
        headerTintColor: COLOR.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerShown: false,
      }}
      initialRouteName={ROUTE.LOGIN}>
      <Stack.Screen name={ROUTE.LOGIN} component={Login} />
      <Stack.Screen name={ROUTE.FORGET_PASSWORD} component={ForgetPassword} />
      <Stack.Screen name={ROUTE.REGISTER} component={Resister} />
      <Stack.Screen name={ROUTE.HOME} component={DrawerNav} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
