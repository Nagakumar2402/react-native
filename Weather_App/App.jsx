import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Search from './src/screen/Search';
import Home from './src/screen/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import IonIcons from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#00aaff" barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Search') {
                iconName = 'search';
              }

              return <IonIcons name={iconName} size={size} color={color} />;
            },

            tabBarActiveTintColor: '#00aaff',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Tab.Screen
            name="Home"
            component={Home}
            initialParams={{city: 'visakhapatnam'}}
          />
          <Tab.Screen name="Search" component={Search} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
