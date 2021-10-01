import {NavigationProp, RouteProp} from '@react-navigation/native';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {gql, useQuery} from '@apollo/client';

import {Box} from 'typings';
import React from 'react';
import {RootStackParamList} from 'config';

interface BoxData {
  box: Box;
}

type BoxesScreenRouteProp = RouteProp<RootStackParamList, 'BoxDetail'>;
type BoxesScreenNavigationProp = NavigationProp<
  RootStackParamList,
  'BoxDetail'
>;

type Props = {
  navigation: BoxesScreenNavigationProp;
  route: BoxesScreenRouteProp;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
  },
});

const GET_BOX = gql`
  query GetBox($id: ID!) {
    box(id: $id) {
      id
      title
    }
  }
`;

export const BoxDetail: React.FC<Props> = ({route}) => {
  const variables = {id: route.params.boxId};

  const {loading, error, data} = useQuery<BoxData>(GET_BOX, {
    variables,
  });

  if (loading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error :(</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View testID="box-detail-screen-title">
        {data?.box && <Text style={styles.title}>{data?.box.title}</Text>}
      </View>
    </SafeAreaView>
  );
};
