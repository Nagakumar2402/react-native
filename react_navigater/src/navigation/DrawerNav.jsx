import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabNavigation from './BottomTabNavigation';
import {COLOR, ROUTE} from '../constants';
import {Notification, Wallet} from '../screens';
import IonIcons from 'react-native-vector-icons/Ionicons';
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: COLOR.primary,
        drawerActiveTintColor: COLOR.white,
        drawerLabelStyle: {
          marginLeft: -25,
        },
      }}>
      <Drawer.Screen
        name={ROUTE.HOME_DRAWER}
        component={BottomTabNavigation}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({color}) => {
            return <IonIcons name="home" size={22} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name={ROUTE.NOTIFICATION_DRAWER}
        component={Notification}
        options={{
          drawerLabel: 'Notification',
          drawerIcon: ({color}) => {
            return <IonIcons name="notifications" size={22} color={color} />;
          },
        }}
      />
      <Drawer.Screen
        name={ROUTE.WALLET_DRAWER}
        component={Wallet}
        options={{
          drawerLabel: 'Wallet',
          drawerIcon: ({color}) => {
            return <IonIcons name="wallet" size={22} color={color} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNav;
