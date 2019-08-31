import React from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/utilities/Layout';
import BottomFooter from '../src/components/Footer';

const StandingsScreen = ({ history }) => (
  <>
    <Layout title="Standings">
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Standings Screen</Text>
        <Button title="Go to Home" onPress={() => history.push('/')} />
        <Button title="Go back" onPress={() => history.push('/')} />
      </View>
    </Layout>
    <BottomFooter history={history}/>
  </>
);

export default StandingsScreen;
