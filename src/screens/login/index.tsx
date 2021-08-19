import {useAuth} from 'hooks';
import React, {FC, useState} from 'react';
import {Text} from 'react-native';
import {Button, StyleSheet, TextInput, View} from 'react-native';

export type LoginData = {
  userName: string;
  password: string;
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  error: {
    color: 'red',
  },
  text: {
    backgroundColor: 'white',
    padding: 8,
    fontSize: 16,
    marginBottom: 8,
  },
});

export const LoginScreen: FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {signIn} = useAuth();

  const resetError = () => {
    setError('');
  };

  const login = () => {
    if (userName === '' || password === '') {
      setError('please fill in all required fields');
      return;
    }
    signIn?.({userName, password});
  };

  return (
    <View style={loginStyles.container}>
      <TextInput
        onChangeText={v => {
          if (v !== '') {
            resetError();
          }
          setUserName(v);
        }}
        placeholder="Username"
        style={loginStyles.text}
        value={userName}
        testID="login-input-username"
      />
      <TextInput
        onChangeText={v => {
          if (v !== '') {
            resetError();
          }
          setPassword(v);
        }}
        placeholder="Password"
        secureTextEntry
        style={loginStyles.text}
        value={password}
        testID="login-input-password"
      />
      {error !== '' && (
        <Text style={loginStyles.error} testID="login-error">
          {error}
        </Text>
      )}
      <Button title="Sign in" onPress={login} />
    </View>
  );
};
