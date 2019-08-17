import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Content, Button, Text } from 'native-base';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';

const LoadingScreen = ({ navigation }) => {
  const { user, userLoading } = useContext(UserContext);
  if (userLoading) return <Text>Loading...</Text>;
  if (user) {
    navigation.navigate('Home');
  }
  return (
    <Layout>
      <Icon name="tournament" size={68} />
      <Button onPress={() => navigation.navigate('Login')}>
        <Text>Go To Login</Text>
      </Button>
      <Button onPress={() => navigation.navigate('Login')}>
        <Text>Sign Up Today</Text>
      </Button>
    </Layout>
  );
};

export default LoadingScreen;
