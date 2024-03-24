import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Settings, SettingDetail} from '../screens';
import {ROUTE} from '../constants';
const Stack = createNativeStackNavigator();
import BottomTabNavigation from './BottomTabNavigation';
const SettingNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={ROUTE.SETTINGS} component={Settings} />
      <Stack.Screen name={ROUTE.SETTING_DETAILS} component={SettingDetail} />
    </Stack.Navigator>
  );
};

export default SettingNavigation;
