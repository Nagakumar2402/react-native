import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, OnBoardScreen} from '../screens';
import {ROUTE} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
const Stack = createStackNavigator();

const OnBoardStackNavigator = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  // useEffect(() => {
  //   const checkFirstLaunch = async () => {
  //     try {
  //       const appData = await AsyncStorage.getItem('isAppFirstLaunched');
  //       if (appData === null) {
  //         setIsAppFirstLaunched(true);
  //         await AsyncStorage.setItem('isAppFirstLaunched', 'false');
  //       } else {
  //         setIsAppFirstLaunched(false);
  //       }
  //     } catch (error) {
  //       console.error('Error retrieving data:', error);
  //     }
  //   };

  //   checkFirstLaunch();
  // }, []);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        // Batch AsyncStorage operations for improved performance
        const [[_, appData]] = await AsyncStorage.multiGet([
          'isAppFirstLaunched',
        ]);
        if (appData === null) {
          setIsAppFirstLaunched(true);
          // Batch AsyncStorage setItem for improved performance
          await AsyncStorage.multiSet([['isAppFirstLaunched', 'false']]);
        } else {
          setIsAppFirstLaunched(false);
        }
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    checkFirstLaunch();
  }, []);

  return (
    isAppFirstLaunched !== null && (
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={ROUTE.ONBOARD_SCREEN}>
        {isAppFirstLaunched && (
          <Stack.Screen name={ROUTE.ONBOARD_SCREEN} component={OnBoardScreen} />
        )}
        <Stack.Screen name={ROUTE.HOME} component={Home} />
      </Stack.Navigator>
    )
  );
};

export default OnBoardStackNavigator;

const LoadingSpinner = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
