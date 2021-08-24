import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'config';
import {useAuth} from 'hooks';
import React from 'react';
import {Text} from 'react-native';
import {Button, StyleSheet, View} from 'react-native';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Profile'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const HomeScreen: React.FC<Props> = ({navigation}) => {
  const {user, signOut} = useAuth();

  return (
    <View style={homeStyles.container} testID="home-screen">
      <Text>Welcome</Text>
      <Button
        onPress={() =>
          navigation.navigate('Profile', {userId: user?.userName || ''})
        }
        testID="home-screen-button-profile"
        title={`Go to ${user?.userName}'s profile`}
      />
      <Button
        onPress={() => signOut?.()}
        testID="home-screen-button-logout"
        title="Sign out"
      />
    </View>
  );
};
