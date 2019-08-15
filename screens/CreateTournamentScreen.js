import React from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/Layout';

const CreateTournamentScreen = props => (
  <Layout title={'Pools'}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Create Pool</Text>
    </View>
  </Layout>
);

export default CreateTournamentScreen;
