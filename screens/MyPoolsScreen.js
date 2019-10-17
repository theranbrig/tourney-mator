import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { Button, Text, List, ListItem, Body, Right } from 'native-base';
import Layout from '../src/utilities/Layout';
import BottomFooter from '../src/components/Footer';
import { UserContext } from '../src/utilities/UserContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMutation } from '@apollo/react-hooks';
import { ACCEPT_REQUEST_MUTATION, DELETE_REQUEST_MUTATION } from '../src/utilities/Mutations';

const MyPoolsScreen = ({ history }) => {
  const { user, userRefetch } = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);

  const [acceptRequest, onAcceptCompleted: onCompleted, acceptData: data] = useMutation(
    ACCEPT_REQUEST_MUTATION,
    {
      onAcceptCompleted: async data => {
        await userRefetch();
      },
    }
  );

  const [deleteRequest, onDeleteCompleted: onCompleted, deleteData: data] = useMutation(
    DELETE_REQUEST_MUTATION,
    {
      onDeleteCompleted: async data => {
        console.log(deleteData);
        await userRefetch();
      },
    }
  );

  const onRefresh = () => {
    setRefreshing(true);
    userRefetch().then(() => {
      setRefreshing(false);
    });
  };

  useEffect(() => {
    userRefetch();
  }, [onDeleteCompleted, onAcceptCompleted]);

  return (
    <>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />}
      >
        {user.tournamentRequests ? (
          <List style={{ marginTop: 40 }}>
            {user.tournamentRequests.map(request => (
              <ListItem
                style={{ backgroundColor: '#fc3', width: '100%', height: 50, marginLeft: 0 }}
                key={request.id}
              >
                <Body>
                  <Text>{request.tournament.name}</Text>
                </Body>
                <Right style={{ flexDirection: 'row', marginRight: 10 }}>
                  <Button
                    onPress={() => {
                      acceptRequest({
                        variables: { id: request.id, tournamentId: request.tournament.id },
                      });
                    }}
                    rounded
                    bordered
                    style={{
                      margin: 5,
                      borderColor: '#7a0019',
                      borderWidth: 3,
                      width: 40,
                      height: 40,
                      textAlign: 'center',
                    }}
                  >
                    <Icon
                      name='check-outline'
                      style={{ fontSize: 27, color: '#7a0019', paddingLeft: 6 }}
                    />
                  </Button>
                  <Button
                    onPress={() => {
                      deleteRequest({ variables: { id: request.id } });
                    }}
                    rounded
                    bordered
                    style={{
                      margin: 5,
                      borderColor: '#7a0019',
                      borderWidth: 3,
                      width: 40,
                      height: 40,
                      textAlign: 'center',
                    }}
                  >
                    <Icon
                      name='close-outline'
                      style={{ fontSize: 27, color: '#7a0019', paddingLeft: 6 }}
                    />
                  </Button>
                </Right>
              </ListItem>
            ))}
          </List>
        ) : (
          <></>
        )}
        <Layout title='Pools'>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pools Screen</Text>
            <Button title='Create Tourney' onPress={() => history.push('/create')}>
              <Text>Create</Text>
            </Button>
            <Button title='Wait for Tourney' onPress={() => history.push('/waiting')}>
              <Text>Wait</Text>
            </Button>
            <Button title='Live Tourney' onPress={() => history.push('/live')}>
              <Text>Live</Text>
            </Button>
            <Button title='View Tourney' onPress={() => history.push('/tournament')}>
              <Text>View</Text>
            </Button>
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
