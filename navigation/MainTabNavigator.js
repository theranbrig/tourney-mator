import React from 'react';
import { Platform } from 'react-native';

import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CreateTournamentScreen from '../screens/CreateTournamentScreen';
import StandingsScreen from '../screens/StandingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const MainContent = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => <Icon name="home" size={20} color={tintColor} />,
      },
    },
    Pools: {
      screen: CreateTournamentScreen,
      navigationOptions: {
        tabBarLabel: 'Pools',
        tabBarIcon: ({ tintColor }) => <Icon name="basketball" size={20} color={tintColor} />,
      },
    },
    Standing: {
      screen: StandingsScreen,
      navigationOptions: {
        tabBarLabel: 'Standings',
        tabBarIcon: ({ tintColor }) => <Icon name="format-list-numbered" size={20} color={tintColor} />,
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => <Icon name="account" size={20} color={tintColor} />,
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#F8F8F8', // active icon color
      inactiveTintColor: '#586589', // inactive icon color
      style: {
        backgroundColor: '#171F33', // TabBar background
      },
    },
  }
);

export default MainContent;
