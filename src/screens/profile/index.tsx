import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'config';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ProfileScreen: React.FC<Props> = ({route}) => {
  return (
    <View style={profileStyles.container}>
      <Text testID="profile-username">{route.params.userId}</Text>
    </View>
  );
};
