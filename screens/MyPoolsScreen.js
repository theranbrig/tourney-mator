import React, { useContext } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Layout from '../src/utilities/Layout';
import BottomFooter from '../src/components/Footer';
import { UserContext } from '../src/utilities/UserContext';

const MyPoolsScreen = ({ history }) => {
  const { user } = useContext(UserContext);


  console.log(user.tournaments);
  return (
    <>
      <Layout title='Pools'>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Pools Screen</Text>
          <Button title='Create Tourney' onPress={() => history.push('/create')} />
          <Button title='Wait for Tourney' onPress={() => history.push('/waiting')} />
          <Button title='Live Tourney' onPress={() => history.push('/live')} />
          <Button title='View Tourney' onPress={() => history.push('/tournament')} />
          {user.tournaments.length && (
            <>
              <Text>Tournaments</Text>
              {user.tournaments.map(tournament => (
                <TouchableOpacity
                  onPress={() => history.push('/tournament', { tournamentId: tournament.id })}
                >
                  <Text>{tournament.name}</Text>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>
      </Layout>
      <BottomFooter history={history} />
    </>
  );
};

export default MyPoolsScreen;
