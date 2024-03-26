import React, {useEffect, useState, Suspense, lazy} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTE} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Home, OnBoardScreen} from '../screens';
import {ActivityIndicator, View} from 'react-native';
const Stack = createStackNavigator();

// Lazy load the Home component
const HomeScreen = lazy(() => import('../screens/HomeScreen'));

const OnBoardStackNavigator = () => {
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const appData = await AsyncStorage.getItem('isAppFirstLaunched');
        if (appData === null) {
          setIsAppFirstLaunched(true);
          await AsyncStorage.setItem('isAppFirstLaunched', 'false');
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
        {/* Wrap Home component in Suspense */}
        <Stack.Screen name={ROUTE.HOME}>
          {() => (
            <Suspense fallback={<LoadingSpinner />}>
              <HomeScreen />
            </Suspense>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    )
  );
};

export default OnBoardStackNavigator;

// // Placeholder loading spinner component
const LoadingSpinner = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <ActivityIndicator size="large" color="#0000ff" />
  </View>
);
