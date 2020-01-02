import React from 'react';
import { View, Text } from 'native-base';

const PreviousPicks = ({ previousPicks }) => (
  <View style={{ borderBottomWidth: 2, borderBottomColor: '#fff', paddingTop: 10, height: 90 }}>
    <Text style={{ fontFamily: 'graduate', color: '#fc3', textAlign: 'center', fontSize: 16 }}>PREVIOUS PICKS</Text>
    <View
      style={{
        width: '95%',
        margin: '2.5%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
      }}
    >
      {previousPicks.length ? (
        previousPicks.map(pick => (
          <View id={pick.team} style={{ width: '25%', textAlign: 'center', margin: 2 }}>
            <Text style={{ fontFamily: 'graduate', color: '#fff', textAlign: 'center', fontSize: 10 }}>
              <Text style={{ fontFamily: 'graduate', color: '#fc0', textAlign: 'center', fontSize: 10 }}>
                {pick.pick}
              </Text>{' '}
              - {pick.username}
            </Text>
            <Text style={{ fontFamily: 'graduate', color: '#fff', textAlign: 'center', fontSize: 10 }}>
              {pick.seed}
              {pick.region} - {pick.team}
            </Text>
          </View>
        ))
      ) : (
        <View>
          <Text style={{ fontFamily: 'graduate', color: '#fc3', textAlign: 'center', fontSize: 10 }}>No Picks Yet</Text>
        </View>
      )}
    </View>
  </View>
);

export default PreviousPicks;
