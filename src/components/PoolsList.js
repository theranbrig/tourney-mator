import React from 'react';
import { View, TouchableOpacity } from 'react-native';
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
import SpecialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwipeListView } from 'react-native-swipe-list-view';

const PoolsList = ({ user }) => {
  return (
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
          data={user.tournamentMembers}
          disableRightSwipe
          keyExtractor={item => item.tournament.id}
          renderItem={(data, rowMap) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  history.push('/tournament', { tournamentId: data.item.tournament.id })
                }
                key={data.item.tournament.id}
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
                      {data.item.tournament.name}
                    </Text>
                    <Text
                      style={{
                        color: '#7a0019',
                        fontFamily: 'graduate',
                        textAlign: 'center',
                      }}
                    >
                      {data.item.tournament.startDate}
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
                      {data.item.tournament.tournamentMembers.length}
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
              onPress={() => {
                leaveTournament({
                  variables: {
                    id: data.item.tournament.id,
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
  );
};

export default PoolsList;