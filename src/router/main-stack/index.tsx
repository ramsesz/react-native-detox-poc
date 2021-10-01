import * as React from 'react';

import {
  BoxDetail,
  BoxesScreen,
  HomeScreen,
  LoginScreen,
  ProfileScreen,
} from 'screens';

import {RootStackParamList} from 'config';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuth} from 'hooks';

const RootStack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  const {user} = useAuth();

  return (
    <RootStack.Navigator initialRouteName="Home">
      {user === null ? (
        <RootStack.Screen name="Login" component={LoginScreen} />
      ) : (
        <>
          <RootStack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Home'}}
          />
          <RootStack.Screen name="Profile" component={ProfileScreen} />
          <RootStack.Screen name="Boxes" component={BoxesScreen} />
          <RootStack.Screen name="BoxDetail" component={BoxDetail} />
        </>
      )}
    </RootStack.Navigator>
  );
};
