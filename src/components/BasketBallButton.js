import React from 'react';
import { View, Text } from 'native-base';
import { Image, TouchableOpacity } from 'react-native';
import Pulse from 'react-native-pulse';

const BasketBallButton = ({ clickFunction, disabled, title }) => (
  <View style={{ alignItems: 'center' }}>
    <View>
      <Text
        style={{
          fontSize: 20,
          color: '#fc0',
          fontFamily: 'graduate',
          textAlign: 'center',
          marginTop: 10,
        }}
      >
        {title}
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 10,
          borderColor: '#fff',
          backgroundColor: '#fc3',
          borderWidth: 4,
          borderRadius: 75,
          padding: 10,
          height: 150,
          width: 150,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          textAlign: 'center',
        }}
        onPress={() => clickFunction()}
        disabled={disabled}
      >
        <Pulse color="white" numPulses={3} diameter={150} speed={20} duration={2000} />
        <Image
          style={{ height: 90, width: 110, alignSelf: 'center' }}
          source={require('../../assets/images/maroonBasketballOutlineSmall.png')}
        />
      </TouchableOpacity>
    </View>
  </View>
);

export default BasketBallButton;
