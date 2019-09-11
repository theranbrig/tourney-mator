import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../src/utilities/Layout';
import AppHeader from '../src/components/Header';

const WaitingTournamentScreen = ({ history }) => (
  <Layout title='Pools'>
    <AppHeader history={history} title='Ready' />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Waiting for Tournaments</Text>
    </View>
  </Layout>
);

export default WaitingTournamentScreen;
