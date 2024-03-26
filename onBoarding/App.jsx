import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import OnBoardStackNavigator from './src/navigation/OnBoardStackNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <OnBoardStackNavigator />
    </NavigationContainer>
  );
};
export default App;
