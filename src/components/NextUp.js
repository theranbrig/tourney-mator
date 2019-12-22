import React from 'react';
import { View, Text } from 'native-base';

const NextUp = ({ current, next, later, picks, currentPick }) => {
  console.log('PICKS', picks);
  console.log('Current', currentPick);
  return (
    <View style={{ borderBottomWidth: 2, borderBottomColor: '#fff', paddingTop: 10 }}>
      <Text style={{ fontFamily: 'graduate', color: '#fc3', textAlign: 'center', fontSize: 16 }}>NEXT UP</Text>
      <View
        style={{
          width: '95%',
          margin: '2.5%',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          textAlign: 'center',
          paddingBottom: 20,
        }}
      >
        {picks.map((pick, index) => (
          <View style={{ width: '25%', textAlign: 'center', margin: 2 }}>
            <Text style={{ fontFamily: 'graduate', color: '#fff', textAlign: 'center', fontSize: 12 }}>
              <Text style={{ fontFamily: 'graduate', color: '#fc0', textAlign: 'center', fontSize: 12 }}>
                {currentPick + index + 1}
              </Text>{' '}
              - {pick.user.username}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
export default NextUp;
