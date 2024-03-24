import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLOR, ROUTE} from '../constants';
import {Home, Wallet, Settings, Notification} from '../screens';
import IonIcons from 'react-native-vector-icons/Ionicons';
import SettingNavigation from './SettingNavigation';
const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLOR.primary,
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === ROUTE.HOME_TAB) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === ROUTE.WALLET) {
            iconName = focused ? 'wallet' : 'wallet-outline';
          } else if (route.name === ROUTE.NOTIFICATION) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === ROUTE.SETTING_NAVIGATOR) {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = focused ? 'error' : 'error-outline';
          }
          return <IonIcons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name={ROUTE.HOME_TAB} component={Home} />
      <Tab.Screen name={ROUTE.WALLET} component={Wallet} />
      <Tab.Screen name={ROUTE.NOTIFICATION} component={Home} />
      <Tab.Screen
        name={ROUTE.SETTING_NAVIGATOR}
        component={SettingNavigation}
        options={{tabBarLabel: 'Settings'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
