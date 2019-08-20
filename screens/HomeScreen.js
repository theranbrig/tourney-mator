/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useEffect } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Content } from 'native-base';

import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';

const HomeScreen = () => {
  const { user, userLoading } = useContext(UserContext);
  if (userLoading) return <Text>Loading...</Text>;

  return (
    <Layout>
      <Content>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Welcome to Tourney-mator</Text>
        </View>
      </Content>
    </Layout>
  );
};

export default HomeScreen;
