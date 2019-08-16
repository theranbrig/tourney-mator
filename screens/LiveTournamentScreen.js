import React from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/utilities/Layout';

const LiveTournamentScreen = props => (
  <Layout title="Pools">
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Live Tournament</Text>
    </View>
  </Layout>
);

export default LiveTournamentScreen;
