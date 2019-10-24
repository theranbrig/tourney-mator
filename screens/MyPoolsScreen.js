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
import {
  ACCEPT_REQUEST_MUTATION,
  DELETE_REQUEST_MUTATION,
  LEAVE_TOURNAMENT_MUTATION,
} from '../src/utilities/Mutations';
import { SwipeListView } from 'react-native-swipe-list-view';
import RequestList from '../src/components/PoolRequests';
import Collapsible from 'react-native-collapsible';
import JoinPool from '../src/components/JoinPool';

const MyPoolsScreen = ({ history }) => {
  const { user, userRefetch } = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

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

  const [leaveTournament, onLeaveTournamentCompleted: onCompleted] = useMutation(
    LEAVE_TOURNAMENT_MUTATION
  );

  const onRefresh = () => {
    setRefreshing(true);
    userRefetch().then(() => {
      setRefreshing(false);
    });
  };

  useEffect(() => {
    userRefetch();
  }, [onDeleteCompleted, onAcceptCompleted, onLeaveTournamentCompleted]);

  return (
    <>
      <Header style={{ backgroundColor: '#fc3', borderBottomWidth: 2, borderBottomColor: '#fff' }}>
        <Left>
          <Icon
            style={{ color: '#7a0019' }}
            type='FontAwesome5'
            name='chevron-left'
            onPress={() => history.goBack()}
          />
        </Left>
        <Body>
          <Title style={{ color: '#7a0019', fontFamily: 'graduate', fontSize: 20 }}>MY POOLS</Title>
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

      <ScrollView
        style={{ backgroundColor: '#7a0019' }}
        contentContainerStyle={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => onRefresh()}
            style={{ backgroundColor: '#fc3' }}
            showsVerticalScrollIndicator={false}
          />
        }
      >
        {user.tournamentRequests ? (
          <RequestList user={user} acceptRequest={acceptRequest} deleteRequest={deleteRequest} />
        ) : (
          <></>
        )}
        <Layout title='Pools'>
          <View style={{ backgroundColor: '#7a0019' }}>
            {user.tournaments && user.tournaments.length ? (
              <View style={{ width: '100%', paddingTop: 20 }}>
                <Text
                  style={{
                    fontFamily: 'graduate',
                    color: '#fc3',
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                >
                  Upcoming Pools
                </Text>
                <View
                  style={{
                    backgroundColor: '#fc3',
                    borderTopWidth: 2,
                    borderTopColor: '#fff',
                    marginTop: 20,
                  }}
                >
                  <SwipeListView
                    data={user.tournaments}
                    disableRightSwipe
                    renderItem={(data, rowMap) => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            history.push('/tournament', { tournamentId: data.item.id })
                          }
                          key={data.item.id}
                          style={{
                            width: '100%',
                            backgroundColor: '#fc3',
                            borderBottomColor: '#fff',
                            borderBottomWidth: 2,
                            marginLeft: 0,
                            paddingLeft: 5,
                            paddingRight: 5,
                            paddingTop: 10,
                            width: '100%',
                            height: 60,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <SpecialIcon
                              name='tournament'
                              size={30}
                              color='#7a0019'
                              style={{
                                paddingLeft: 15,
                              }}
                            />
                            <View
                              style={{
                                textAlign: 'center',
                              }}
                            >
                              <Text
                                style={{
                                  color: '#7a0019',
                                  fontFamily: 'graduate',
                                  textAlign: 'center',
                                }}
                              >
                                {data.item.name}
                              </Text>
                              <Text
                                style={{
                                  color: '#7a0019',
                                  fontFamily: 'graduate',
                                  textAlign: 'center',
                                }}
                              >
                                {data.item.startDate}
                              </Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                              <Text
                                style={{
                                  color: '#7a0019',
                                  fontFamily: 'graduate',
                                  fontSize: 25,
                                }}
                              >
                                {data.item.tournamentMembers.length}
                              </Text>
                              <SpecialIcon
                                name='account-group'
                                size={30}
                                color='#7a0019'
                                style={{
                                  paddingRight: 15,
                                }}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                    renderHiddenItem={(data, rowMap) => (
                      <TouchableOpacity
                        key={data.item.id}
                        onPress={() => {
                          leaveTournament({
                            variables: {
                              id: data.item.id,
                            },
                          });
                        }}
                        style={{
                          alignItems: 'center',
                          backgroundColor: '#DDD',
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'flex-end',
                          paddingLeft: 15,
                          backgroundColor: 'white',
                          paddingRight: 15,
                        }}
                      >
                        <SpecialIcon name='delete-circle-outline' size={30} color='#7a0019' />
                      </TouchableOpacity>
                    )}
                    rightOpenValue={-75}
                  />
                </View>
              </View>
            ) : (
              <Text>No Pools Yet</Text>
            )}
          </View>
        </Layout>
      </ScrollView>
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            textAlign: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#fc3',
          }}
        >
          <Text
            style={{
              color: '#7a0019',
              fontFamily: 'graduate',

            }}
          >
            Join A Pool
          </Text>
          <SpecialIcon
            name={isCollapsed ? 'chevron-down' : 'chevron-up'}
            size={30}
            color='#7a0019'
          />
        </View>
      </TouchableOpacity>
      <View>
        <View style={{ height: 1, width: '100%' }} />
        {isCollapsed && (
          <View style={{ padding: 16 }}>
            <JoinPool />
          </View>
        )}
      </View>

      <BottomFooter history={history} />
    </>
  );
};

export default MyPoolsScreen;
