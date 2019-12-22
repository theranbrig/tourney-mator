import React from 'react';
import { View, Text } from 'native-base';

const CurrentPick = ({ pick, currentPick }) => (
  <View style={{ paddingBottom: 20, borderBottomWidth: 2, borderBottomColor: '#fff' }}>
    <Text style={{ fontFamily: 'graduate', color: '#fff', textAlign: 'center', fontSize: 20, paddingBottom: 10 }}>CURRENT PICK</Text>
    <Text style={{ fontFamily: 'graduate', color: '#fff', textAlign: 'center', fontSize: 18 }}>
      {currentPick} - {pick.user.username}
    </Text>
  </View>
);

export default CurrentPick;
