import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {Platform, SafeAreaView, StyleSheet, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MainStack} from 'router';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {UserProvider} from 'hooks';

const GRAPHQL_HOST = Platform.OS === 'ios' ? 'localhost' : '10.0.2.2';
const GRAPHQL_URI = `http://${GRAPHQL_HOST}:4000/graphql`;

// Initialize Apollo Client
const client = new ApolloClient({
  uri: GRAPHQL_URI,
  cache: new InMemoryCache(),
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = StyleSheet.create({
    container: {
      ...backgroundStyle,
      flex: 1,
      minHeight: '100%',
    },
  });

  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </SafeAreaView>
      </ApolloProvider>
    </UserProvider>
  );
};

export default App;
