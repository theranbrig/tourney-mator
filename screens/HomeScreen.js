/* eslint-disable react/jsx-one-expression-per-line */
import React, { useContext, useState, useEffect } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import { Content, Container, Footer, FooterTab, Button, Text, List, ListItem } from 'native-base';
import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';
import BottomFooter from '../src/components/Footer';

import BackButtonHeader from '../src/components/BackButtonHeader';

const HomeScreen = ({ history }) => {
  const { user } = useContext(UserContext);
  const [scheduleData, setScheduleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  if (!user) {
    history.push('/');
  }

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

  const getScores = params => {
    fetch(
      'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?limit=900'
    )
      .then(res => res.json())
      .then(data => {
        setScheduleData(data);
        console.log(data.events[0].competitions[0].competitors[0].team.shortDisplayName);
        setScheduleData(data);
        setLoading(false);
      });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getScores();
    setRefreshing(false);
  };

  useEffect(() => {
    setLoading(true);
    fetch(
      'http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard?limit=900'
    )
      .then(res => res.json())
      .then(data => {
        setScheduleData(data);
        console.log(data.events[0].competitions[0].competitors[1].curatedRank.current);
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
      <BackButtonHeader history={history} title={'HOME'} />
      {scheduleData && (
        <>
          <ScrollView
            style={{ backgroundColor: '#7a0019' }}
            contentContainerStyle={{
              flex: 1,
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh()}
                style={{ backgroundColor: '#fc3' }}
                showsVerticalScrollIndicator={false}
              />
            }
          >
            <Layout>
              <Text>{scheduleData.leagues[0].midsizeName}</Text>
              <List style={{ marginLeft: 0 }}>
                {scheduleData.events.map(event => (
                  <ListItem
                    key={event.id}
                    style={{ marginLeft: 0, backgroundColor: '#fff', height: 70 }}
                  >
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View
                          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Image
                              style={{ width: 40, height: 40 }}
                              source={{ uri: event.competitions[0].competitors[1].team.logo }}
                            />
                            {event.competitions[0].competitors[1].curatedRank.current < 26 && (
                              <Text>
                                {event.competitions[0].competitors[1].curatedRank.current}
                              </Text>
                            )}
                            <Text>
                              {event.competitions[0].competitors[1].team.shortDisplayName} (
                              {event.competitions[0].competitors[1].records[0].summary})
                            </Text>
                          </View>

                          <Text>{event.competitions[0].competitors[1].score}</Text>
                        </View>
                        <View
                          style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}
                        >
                          <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image
                              style={{ width: 40, height: 40 }}
                              source={{ uri: event.competitions[0].competitors[0].team.logo }}
                            />
                            {event.competitions[0].competitors[0].curatedRank.current < 26 && (
                              <Text>
                                ({event.competitions[0].competitors[0].curatedRank.current})
                              </Text>
                            )}
                            <Text>
                              {event.competitions[0].competitors[0].team.shortDisplayName} (
                              {event.competitions[0].competitors[0].records[0].summary})
                            </Text>
                          </View>

                          <Text>{event.competitions[0].competitors[0].score}</Text>
                        </View>
                        <View>
                          <Text style={{ alignSelf: 'flex-end' }}>{event.status.type.detail}</Text>
                        </View>
                      </View>
                    </View>
                  </ListItem>
                ))}
              </List>
            </Layout>
          </ScrollView>
        </>
      )}
      <BottomFooter history={history} />
    </>
  );
};

export default HomeScreen;
