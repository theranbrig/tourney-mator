import React from 'react';
import { View, Text } from 'native-base';

const NextUp = ({ current, next, later }) => (
  <View>
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
      <View style={{ width: '25%', textAlign: 'center', margin: 2 }}>
        <Text style={{ fontFamily: 'graduate', color: '#fc3', textAlign: 'center', fontSize: 12 }}>{current}</Text>
      </View>
      <View style={{ width: '25%', textAlign: 'center', margin: 2 }}>
        <Text style={{ fontFamily: 'graduate', color: '#fc3', textAlign: 'center', fontSize: 12 }}>{next}</Text>
      </View>
      <View style={{ width: '25%', textAlign: 'center', margin: 2 }}>
        <Text style={{ fontFamily: 'graduate', color: '#fc3', textAlign: 'center', fontSize: 12 }}>{later}</Text>
      </View>
    </View>
  </View>
);

export default NextUp;
