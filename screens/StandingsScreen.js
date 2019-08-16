import React from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/utilities/Layout';

const StandingsScreen = props => (
  <Layout title="Standings">
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Standings Screen</Text>
      <Button title="Go to Home" onPress={() => props.navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
    </View>
  </Layout>
);

export default StandingsScreen;
