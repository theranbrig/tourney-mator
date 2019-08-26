/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState } from 'react';
import { Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Content } from 'native-base';
import { NavigationEvents } from 'react-navigation';
import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';

const HomeScreen = () => {
  const { userLoading, setUser, userData, user } = useContext(UserContext);
  const [userState, setUserState] = useState(userData)

  return (
    <Layout>
      <NavigationEvents
        onDidFocus={async payload => {
          if(userLoading) return <Text>Loading...</Text>
          setUserState(user)
        }}
      />
      {userState === null ? (
        <Content>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>No User Found</Text>
          </View>
        </Content>
      ) : (
        <Content>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello {userState.username}</Text>
          </View>
        </Content>
      )}
    </Layout>
  );
};

export default HomeScreen;
