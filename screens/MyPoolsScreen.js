import React from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/utilities/Layout';
import BottomFooter from '../src/components/Footer';

const MyPoolsScreen = ({ history }) => (
  <>
    <Layout title="Pools">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Pools Screen</Text>
        <Button title="Create Tourney" onPress={() => history.push('/create')} />
        <Button title="Wait for Tourney" onPress={() => history.push('/waiting')} />
        <Button title="Live Tourney" onPress={() => history.push('/live')} />
      </View>
    </Layout>
    <BottomFooter history={history} />
  </>
);

export default MyPoolsScreen;
