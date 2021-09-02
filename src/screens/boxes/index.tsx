import {gql, useQuery} from '@apollo/client';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'config';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import {Box} from 'typings';

interface BoxesData {
  boxes: Box[];
}

type BoxesScreenRouteProp = RouteProp<RootStackParamList, 'Boxes'>;
type BoxesScreenNavigationProp = NavigationProp<RootStackParamList, 'Boxes'>;

type Props = {
  navigation: BoxesScreenNavigationProp;
  route: BoxesScreenRouteProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const GET_BOXES = gql`
  query GetBoxes {
    boxes {
      id
      title
    }
  }
`;

export const BoxesScreen: React.FC<Props> = () => {
  const {loading, error, data} = useQuery<BoxesData>(GET_BOXES);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error :(</Text>;
  }
  return (
    <View style={styles.container}>
      <View>
        {data?.boxes.map(({title, id}) => (
          <View key={id}>
            <Text>{title}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};
