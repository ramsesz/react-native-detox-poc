import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'config';
import React from 'react';
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
  return (
    <View style={homeStyles.container} testID="home-screen">
      <Button
        onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
        testID="home-screen-button-profile"
        title="Go to Jane's profile"
      />
    </View>
  );
};
