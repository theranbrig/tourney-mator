import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Button, Text, List, ListItem, Body, Right } from 'native-base';
import Layout from '../src/utilities/Layout';
import BottomFooter from '../src/components/Footer';
import { UserContext } from '../src/utilities/UserContext';

const MyPoolsScreen = ({ history }) => {
  const { user, userRefetch } = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  console.log(user);

  const onRefresh = () => {
    setRefreshing(true);
    userRefetch().then(() => {
      setRefreshing(false);
    });
  };

  return (
    <>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}
      >
        {user.tournamentRequests.length && (
          <List style={{ backgroundColor: '#fc3', width: '100%', height: 50, marginTop: 50 }}>
            {user.tournamentRequests.map(request => (
              <ListItem
                style={{ backgroundColor: '#fc3', width: '100%', height: 50, marginLeft: 0 }}
                key={request.id}
              >
                <Body>
                  <Text>{request.tournament.name}</Text>
                </Body>
                <Right style={{ flexDirection: 'row' }}>
                  <Button>
                    <Text>Hi</Text>
                  </Button>
                  <Button>
                    <Text>Hi</Text>
                  </Button>
                </Right>
              </ListItem>
            ))}
          </List>
        )}
        <Layout title='Pools'>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pools Screen</Text>
            <Button title='Create Tourney' onPress={() => history.push('/create')} />
            <Button title='Wait for Tourney' onPress={() => history.push('/waiting')} />
            <Button title='Live Tourney' onPress={() => history.push('/live')} />
            <Button title='View Tourney' onPress={() => history.push('/tournament')} />
            {user.tournaments && user.tournaments.length ? (
              <>
                <Text>Tournaments</Text>
                {user.tournaments.map(tournament => (
                  <TouchableOpacity
                    onPress={() => history.push('/tournament', { tournamentId: tournament.id })}
                    key={tournament.id}
                  >
                    <Text>{tournament.name}</Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <Text>No Pools Yet</Text>
            )}
          </View>
        </Layout>
      </ScrollView>
      <BottomFooter history={history} />
    </>
  );
};

export default MyPoolsScreen;
