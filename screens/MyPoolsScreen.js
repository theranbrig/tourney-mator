import React from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/Layout';

const MyPoolsScreen = props => (
  <Layout title={'Pools'}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Pools Screen</Text>
      <Button title="Create Tourney" onPress={() => props.navigation.navigate('CreateTournament')} />
      <Button title="Wait for Tourney" onPress={() => props.navigation.navigate('WaitTournament')} />
      <Button title="Live Tourney" onPress={() => props.navigation.navigate('Live')} />
    </View>
  </Layout>
);

export default MyPoolsScreen;
