import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../src/utilities/Layout';
import BackButtonHeader from '../src/components/BackButtonHeader';

const WaitingTournamentScreen = ({ history }) => (
  <Layout title='Pools'>
    <BackButtonHeader history={history} title='Ready' />
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Waiting for Tournaments</Text>
    </View>
  </Layout>
);

export default WaitingTournamentScreen;
