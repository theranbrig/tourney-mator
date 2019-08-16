import React from 'react';
import { View, Text } from 'react-native';
import Layout from './Layout';

const WaitingTournamentScreen = props => (
  <Layout title="Pools">
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Waiting for Tournaments</Text>
    </View>
  </Layout>
);

export default WaitingTournamentScreen;
