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

import SpecialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const RequestList = ({ user, acceptRequest, deleteRequest }) => {
  return (
    <List>
      {user.tournamentRequests.map(request => (
        <ListItem
          style={{
            backgroundColor: '#fc3',
            width: '100%',
            height: 50,
            marginLeft: 0,
            borderBottomColor: '#fff',
            borderBottomWidth: 2,
          }}
          key={request.id}
        >
          <Body>
            <Text
              style={{
                color: '#7a0019',
                fontFamily: 'graduate',
              }}
            >
              {request.tournament.name}
            </Text>
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
              <SpecialIcon
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
              <SpecialIcon
                name='close-outline'
                style={{ fontSize: 27, color: '#7a0019', paddingLeft: 6 }}
              />
            </Button>
          </Right>
        </ListItem>
      ))}
    </List>
  );
};

export default RequestList;
