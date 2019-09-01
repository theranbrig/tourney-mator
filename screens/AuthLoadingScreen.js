import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, Content, View } from 'native-base';
import SpinningImage from 'react-native-spinning-image';
import { Image, StatusBar } from 'react-native';
import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';

const LoadingScreen = ({ history }) => {
  const spinning = require('../assets/images/basketball-hoop-outline.png');
  const { user, userLoading } = useContext(UserContext);
  if (userLoading) return <Text>Loading</Text>;
  if (user) {
    history.push('/home');
  }
  return (
    <Layout>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7a0019' }}>
        <Image source={spinning} />
        <Button onPress={() => history.push('/login')}>
          <Text>Go To Login</Text>
        </Button>
        <Button onPress={() => history.push('/signup')}>
          <Text>Sign Up Today</Text>
        </Button>
      </View>
    </Layout>
  );
};

export default LoadingScreen;
