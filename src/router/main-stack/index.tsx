import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from 'config';
import {useAuth} from 'hooks';
import * as React from 'react';
import {HomeScreen, LoginScreen, ProfileScreen} from 'screens';

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
        </>
      )}
    </RootStack.Navigator>
  );
};
