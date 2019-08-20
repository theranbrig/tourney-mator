import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Content } from 'native-base';
import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';

const LoadingScreen = ({ navigation }) => {
  const { user, userLoading, } = useContext(UserContext);
  if (userLoading) return <Text>Loading</Text>;
  if (user) {
    navigation.navigate('Home');
  }
  return (
    <Content>
      <Icon name="tournament" size={68} />
      <Button onPress={() => navigation.navigate('Login')}>
        <Text>Go To Login</Text>
      </Button>
      <Button onPress={() => navigation.navigate('Login')}>
        <Text>Sign Up Today</Text>
      </Button>
    </Content>
  );
};

export default LoadingScreen;
