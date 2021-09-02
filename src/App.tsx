import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {MainStack} from 'router';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {UserProvider} from 'hooks';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
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
