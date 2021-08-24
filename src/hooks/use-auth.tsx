import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect} from 'react';
import {LoginData} from 'screens';

type User = {
  userName: string;
};

type ContextProps = {
  signIn: (loginData: LoginData) => void;
  signOut: () => void;
  user: User | null;
};

export const UserContext = createContext<Partial<ContextProps>>({});

export const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = React.useState<User | null>(null);
  const signIn = (loginData: LoginData) => {
    const {userName, password} = loginData;
    if (password !== '') {
      AsyncStorage.setItem('user', JSON.stringify({userName}));
      setUser({userName});
    }
  };
  const signOut = () => {
    AsyncStorage.removeItem('user');
    setUser(null);
  };

  useEffect(() => {
    const getUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    };

    getUser();
  }, []);
  return (
    <UserContext.Provider value={{user, signIn, signOut}}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('`useAuth` must be within a `UserProvider`');
  }
  return context;
};
