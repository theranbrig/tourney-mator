import React, { useContext, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Content, Button, Text } from 'native-base';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';

const LoadingScreen = ({ navigation }) => {
  const { user, userLoading } = useContext(UserContext);

  if (user) {
    navigation.navigate('Home');
  }

  return (
    <Layout>
      <Content>
        <Icon name="tournament" size={68} />
        <Button onPress={() => navigation.navigate('Login')}>
          <Text>Go To Login</Text>
        </Button>
      </Content>
    </Layout>
  );
};

export default LoadingScreen;
