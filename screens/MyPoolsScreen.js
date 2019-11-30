import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, RefreshControl, Alert } from 'react-native';
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
import { FirebaseContext } from '../src/utilities/Firebase';
import SpecialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMutation } from '@apollo/react-hooks';
import {
  ACCEPT_REQUEST_MUTATION,
  DELETE_REQUEST_MUTATION,
  LEAVE_TOURNAMENT_MUTATION,
  JOIN_TOURNAMENT_MUTATION,
} from '../src/utilities/Mutations';
import { SwipeListView } from 'react-native-swipe-list-view';
import RequestList from '../src/components/PoolRequests';
import JoinPool from '../src/components/JoinPool';
import PoolsHeader from '../src/components/PoolsHeader';
import PoolsList from '../src/components/PoolsList';

const MyPoolsScreen = ({ history }) => {
  const { user, userRefetch } = useContext(UserContext);
  const { firebase, liveUserData, firebaseValue } = useContext(FirebaseContext);
  const [refreshing, setRefreshing] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [error, setError] = useState(null);
  const [docSnap, setDocSnap] = useState(null);

  console.log(user);
  const removeTournamentAlert = tournamentId => {
    Alert.alert('Remove Pool?', 'Are you sure you want to remove this pool?', [
      { text: 'NO', onPress: () => console.warn('Thanks for staying'), style: 'cancel' },
      {
        text: 'YES',
        onPress: async () => {
          await leaveTournament({
            variables: {
              id: tournamentId,
            },
          });
          console.warn('Sorry to see you go.');
        },
      },
    ]);
  };

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
        await userRefetch();
      },
    }
  );

  const [leaveTournament, onLeaveTournamentCompleted: onCompleted] = useMutation(
    LEAVE_TOURNAMENT_MUTATION
  );

  const [joinTournament, onJoinTournamentCompleted: onCompleted, onError] = useMutation(
    JOIN_TOURNAMENT_MUTATION,
    {
      onError: error => {
        setError(error.message);
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
    firebaseValue && setDocSnap(firebaseValue.docs);
  }, [
    onDeleteCompleted,
    onAcceptCompleted,
    onLeaveTournamentCompleted,
    onJoinTournamentCompleted,
    docSnap,
    firebaseValue,
  ]);

  return (
    <>
      <PoolsHeader history={history} user={user} />
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
        }>
        {user.tournamentRequests ? (
          <RequestList user={user} acceptRequest={acceptRequest} deleteRequest={deleteRequest} />
        ) : (
          <></>
        )}
        <Layout title="Pools">
          <View style={{ backgroundColor: '#7a0019' }}>
            {user.tournamentMembers && user.tournamentMembers.length ? (
              <PoolsList user={user} history={history} leaveTournament={leaveTournament} />
            ) : (
              <Text
                style={{
                  color: '#7a0019',
                  fontFamily: 'graduate',
                  fontSize: 20,
                  textAlign: 'center',
                }}>
                No Pools Yet
              </Text>
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
            borderBottomColor: '#7a0019',
            borderBottomWidth: 2,
          }}>
          <Text
            style={{
              color: '#7a0019',
              fontFamily: 'graduate',
              fontSize: 16,
            }}>
            Join A Pool
          </Text>
          <SpecialIcon
            name={isCollapsed ? 'chevron-up' : 'chevron-down'}
            size={30}
            color="#7a0019"
          />
        </View>
      </TouchableOpacity>
      <View>
        <View style={{ height: 1, width: '100%' }} />
        {!isCollapsed && (
          <View style={{ padding: 16 }}>
            <JoinPool
              joinTournament={joinTournament}
              joinError={error}
              userRefetch={userRefetch}
              onError={onError}
            />
          </View>
        )}
      </View>
      <BottomFooter history={history} />
    </>
  );
};

export default MyPoolsScreen;
