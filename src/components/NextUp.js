import React from 'react';
import { View, Text } from 'native-base';

const NextUp = ({ current, next, later }) => (
  <View>
    <Text>{current}</Text>
    <Text>{next}</Text>
    <Text>{later}</Text>
  </View>
);

export default NextUp;
