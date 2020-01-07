import React from 'react';
import { View, Text } from 'native-base';

const CurrentPick = ({ pick, currentPick, currentMember }) => (
  <View style={{ paddingBottom: 20}}>
    <Text style={{ fontFamily: 'graduate', color: '#fff', textAlign: 'center', fontSize: 20, paddingBottom: 10 }}>
      CURRENT PICK
    </Text>
    <Text
      style={
        currentMember === pick.id
          ? {
              fontFamily: 'graduate',
              color: '#7a0019',
              textAlign: 'center',
              fontSize: 18,
              backgroundColor: '#fc0',
              padding: 10,
            }
          : { fontFamily: 'graduate', color: '#fc0', textAlign: 'center', fontSize: 18 }
      }
    >
      <Text
        style={
          currentMember === pick.id
            ? {
                fontFamily: 'graduate',
                color: '#7a0019',
                textAlign: 'center',
                fontSize: 18,
                backgroundColor: '#fc0',
                padding: 10,
              }
            : { fontFamily: 'graduate', color: '#fc0', textAlign: 'center', fontSize: 18 }
        }
      >
        {currentPick}
      </Text>{' '}
      - {pick.user.username}
    </Text>
  </View>
);

export default CurrentPick;
