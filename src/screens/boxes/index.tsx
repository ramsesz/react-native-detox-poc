import {gql, useQuery} from '@apollo/client';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from 'config';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
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
  list: {flex: 1, width: '100%'},
  listItem: {
    borderBottomColor: '#F1F1F1',
    borderBottomWidth: 1,
    backgroundColor: 'white',
    padding: 16,
    flex: 1,
    width: '100%',
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

export const BoxesScreen: React.FC<Props> = ({navigation}) => {
  const {loading, error, data} = useQuery<BoxesData>(GET_BOXES);
  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error :(</Text>;
  }

  const onPressItem = ({id}: Box) =>
    navigation.navigate('BoxDetail', {boxId: id});

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data?.boxes}
        style={styles.list}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderItem={({item, index, separators}) => (
          <TouchableHighlight
            key={item.id}
            onPress={() => onPressItem(item)}
            onShowUnderlay={separators.highlight}
            onHideUnderlay={separators.unhighlight}>
            <View style={styles.listItem}>
              <Text>{item.title}</Text>
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};
