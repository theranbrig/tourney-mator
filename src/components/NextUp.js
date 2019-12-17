import React from 'react';
import { View, Text } from 'native-base';

const NextUp = ({ current, next, later }) => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View style={{ padding: 5 }}>
      <Text>{current}</Text>
    </View>
    <View style={{ padding: 5 }}>
      <Text>{next}</Text>
    </View>
    <View style={{ padding: 5 }}>
      <Text>{later}</Text>
    </View>
  </View>
);

export default NextUp;
