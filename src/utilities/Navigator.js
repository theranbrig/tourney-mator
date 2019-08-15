import React from 'react';
import {
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MyPoolsScreen from '../screens/MyPoolsScreen';
import StandingsScreen from '../screens/StandingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import CreateTournamentScreen from '../screens/CreateTournamentScreen';
import LiveTournamentScreen from '../screens/LiveTournamentScreen';
import WaitingTournamentScreen from '../screens/WaitingTournamentScreen';
import HomeScreen from '../screens/HomeScreen';

const AuthRoutes = createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  SignUp: {
    screen: SignUpScreen,
  },
});

const PreTournamentRoutes = createStackNavigator({
  MyTournaments: {
    screen: MyPoolsScreen,
    navigationOptions: ({ navigation }) => ({
      title: `My Pools`,
    }),
  },
  CreateTournament: {
    screen: CreateTournamentScreen,
    title: 'Create A Pool',
    navigationOptions: ({ navigation }) => ({
      title: `New Pool`,
    }),
  },
  WaitTournament: {
    screen: WaitingTournamentScreen,
    title: 'Pool Waiting Room',
    navigationOptions: ({ navigation }) => ({
      title: `Waiting Room`,
    }),
  },
});

const Tournaments = createSwitchNavigator({
  TournamentPreparation: {
    screen: PreTournamentRoutes,
  },
  LiveTournament: {
    screen: LiveTournamentScreen,
  },
});

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
      screen: Tournaments,
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

const Navigator = createSwitchNavigator({
  Auth: {
    screen: AuthRoutes,
  },
  Main: {
    screen: MainContent,
  },
  Live: {
    screen: LiveTournamentScreen,
  },
});

export default createAppContainer(Navigator);
