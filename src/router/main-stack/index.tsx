import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen, ProfileScreen} from 'screens';
import {RootStackParamList} from 'config';

const Stack = createStackNavigator();

const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Home'}}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </RootStack.Navigator>
  );
};
