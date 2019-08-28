import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Content } from 'native-base';
import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';

const LoadingScreen = ({ history }) => {
  const { user, userLoading } = useContext(UserContext);
  if (userLoading) return <Text>Loading</Text>;
  if (user) {
    history.push('/home');
  }
  return (
    <Layout>
      <Icon name="tournament" size={68} />
      <Button onPress={() => history.push('/login')}>
        <Text>Go To Login</Text>
      </Button>
      <Button onPress={() => history.push('/signup')}>
        <Text>Sign Up Today</Text>
      </Button>
    </Layout>
  );
};

export default LoadingScreen;
