import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import {
  Button,
  Text,
  List,
  ListItem,
  Body,
  Right,
  Header,
  Title,
  Subtitle,
  Left,
  Icon,
} from 'native-base';
import Layout from '../src/utilities/Layout';
import BottomFooter from '../src/components/Footer';
import { UserContext } from '../src/utilities/UserContext';
import SpecialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
            style={{ backgroundColor: '#fc3' }}
          />
        }
      >
        <Layout title='Pools'>
          <Header style={{ backgroundColor: '#fc3' }}>
            <Left>
              <Icon
                style={{ color: '#7a0019' }}
                type='FontAwesome5'
                name='chevron-left'
                onPress={() => history.goBack()}
              />
            </Left>
            <Body>
              <Title style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 20 }}>
                MY POOLS
              </Title>
              <Subtitle style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 15 }}>
                {user.username}
              </Subtitle>
            </Body>
            <Right>
              <Button transparent>
                <Icon
                  style={{ color: '#7a0019' }}
                  type='FontAwesome5'
                  name='plus-circle'
                  onPress={() => history.push('/create')}
                />
              </Button>
            </Right>
          </Header>
          {user.tournamentRequests ? (
            <List style={{ marginTop: 40, backgroundColor: '#fc3' }}>
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
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {user.tournaments && user.tournaments.length ? (
              <View style={{ width: '100%', marginLeft: 0 }}>
                <Text>Tournaments</Text>
                <List
                  style={{
                    backgroundColor: '#fc3',
                  }}
                >
                  {user.tournaments.map(tournament => (
                    <ListItem
                      style={{ borderBottomColor: '#7a0019', borderBottomWidth: 2, marginLeft: 0 }}
                    >
                      <TouchableOpacity
                        onPress={() => history.push('/tournament', { tournamentId: tournament.id })}
                        key={tournament.id}
                      >
                        <View style={{ flexDirection: 'row' }}>
                          <SpecialIcon name='tournament' size={30} color='#7a0019' />
                          <View>
                            <Text
                              style={{
                                color: '#7a0019',
                                fontFamily: 'graduate',
                              }}
                            >
                              {tournament.name}
                            </Text>
                            <Text
                              style={{
                                color: '#7a0019',
                                fontFamily: 'graduate',
                              }}
                            >
                              {tournament.startDate}
                            </Text>
                          </View>
                        </View>
                        <View>
                          <Text>{tournament.tournamentMembers.length}</Text>
                          <Icon type='FontAwesome5' name='user' size={30} color='#7a0019' />
                        </View>
                      </TouchableOpacity>
                    </ListItem>
                  ))}
                </List>
              </View>
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
