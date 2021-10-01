import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'config';
import {useAuth} from 'hooks';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const homeStyles = StyleSheet.create({
  button: {
    marginBottom: 8,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
  },
});

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {user, signOut} = useAuth();

  return (
    <View style={homeStyles.container} testID="home-screen">
      <Text style={homeStyles.title}>Welcome</Text>
      <View style={homeStyles.button}>
        <Button
          onPress={() =>
            navigation.navigate('Profile', {userId: user?.userName || ''})
          }
          testID="home-screen-button-profile"
          title={`Go to ${user?.userName}'s profile`}
        />
      </View>
      <View style={homeStyles.button}>
        <Button
          onPress={() => navigation.navigate('Boxes')}
          testID="home-screen-button-boxes"
          title={'Boxes'}
        />
      </View>
      <View style={homeStyles.button}>
        <Button
          onPress={() => signOut?.()}
          testID="home-screen-button-logout"
          title="Sign out"
        />
      </View>
    </View>
  );
};
