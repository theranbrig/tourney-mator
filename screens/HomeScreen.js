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
  const styles = StyleSheet.create({
    mainButton: {
      marginTop: 10,
      borderColor: '#f3f3f3',
      backgroundColor: '#ffcc33',
      borderWidth: 2,
      width: '100%',
      borderRadius: 0,
    },
    mainButtonText: {
      fontSize: 20,
      color: '#7a0019',
      fontFamily: 'graduate',
    },
    form: {
      width: '90%',
      backgroundColor: '#7a0019',
      marginBottom: 10,
      marginTop: 50,
      marginLeft: '5%',
      justifyContent: 'center',
    },
    contentArea: {
      backgroundColor: '#7a0019',
    },
    title: {
      textAlign: 'center',
      color: '#ffcc33',
      fontFamily: 'graduate',
      marginBottom: 5,
      fontSize: 25,
    },
    label: {
      color: '#ffcc33',
      fontFamily: 'graduate',
    },
    mainView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#7a0019',
      marginBottom: 50,
    },
    mainButton2: {
      marginTop: 10,
      borderColor: '#fc3',
      backgroundColor: '#f3f3f3',
      borderWidth: 2,
      width: '90%',
      borderRadius: 0,
      marginLeft: '5%',
      marginTop: 50,
    },
    subTitle: {
      textAlign: 'center',
      color: '#f3f3f3',
      fontFamily: 'graduate',
      fontSize: 20,
    },
  });

  useEffect(() => {
    setLoading(true);
    fetch(
      'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard'
    )
      .then(res => res.json())
      .then(data => {
        setScheduleData(data);
        console.log(data.events[0].competitions[0].competitors[0].team.shortDisplayName);
        setScheduleData(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout title='Pools'>
        <View style={styles.mainView}>
          <Text style={styles.title}>Loading Pool Information...</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View style={{ height: 350 }}>
              <Image
                style={{ width: 300, height: 250 }}
                source={require('../assets/images/goldBasketball.png')}
              />
            </View>
          </View>
        </View>
      </Layout>
    );
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
        {scheduleData && (
          <ScrollView>
            <Text>Daily Game Schedule</Text>
            {scheduleData.events.map(event => (
              <View key={event.id}>
                <Text>{event.shortName}</Text>
                <Text>{event.competitions[0].competitors[1].team.shortDisplayName}</Text>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={{ uri: event.competitions[0].competitors[1].team.logo }}
                />
                <Text>{event.competitions[0].competitors[1].records[0].summary}</Text>
                <Text>{event.competitions[0].competitors[1].score}</Text>
                <Text>{event.competitions[0].competitors[0].team.shortDisplayName}</Text>
                <Image
                  style={{ width: 40, height: 40 }}
                  source={{ uri: event.competitions[0].competitors[0].team.logo }}
                  />
                  <Text>{event.competitions[0].competitors[0].records[0].summary}</Text>
                <Text>{event.competitions[0].competitors[0].score}</Text>
                <Text>{event.status.type.detail}</Text>
              </View>
            ))}
          </ScrollView>
        )}
      </Layout>
      <BottomFooter history={history} />
    </>
  );
};

export default HomeScreen;
