/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState, useEffect } from 'react';
import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Content, Container, Footer, FooterTab, Button, Text } from 'native-base';
import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';
import BottomFooter from '../src/components/Footer';

const HomeScreen = ({ history }) => {
  const { user } = useContext(UserContext);
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(false);

  // if (!user) {
  //   history.push('/');
  // }

  useEffect(() => {
    setLoading(true);
    fetch(
      'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard'
    )
      .then(res => res.json())
      .then(data => {
        setScheduleData(data);
        console.log(data);
        setScheduleData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <>
      <Layout>
        {!user ? (
          <Text>No User Found</Text>
        ) : (
          <>
            <Text>Hello {user.username}</Text>
          </>
        )}
      </Layout>
      <BottomFooter history={history} />
    </>
  );
};

export default HomeScreen;
