import React from 'react';
import { NativeRouter, Route, Link } from 'react-router-native';
import CreateTournamentScreen from '../screens/CreateTournamentScreen';
import HomeScreen from '../screens/HomeScreen';
import LiveTournamentScreen from '../screens/LiveTournamentScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import MyPoolsScreen from '../screens/MyPoolsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignUpScreen from '../screens/SignUpScreen';
import StandingsScreen from '../screens/StandingsScreen';
import WaitingTournamentScreen from '../screens/WaitingTournamentScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Routing = () => (
  <NativeRouter>
    <Route exact path="/" component={AuthLoadingScreen} />
    <Route path="/home" component={HomeScreen} />
    <Route path="/profile" component={ProfileScreen} />
    <Route path="/standings" component={StandingsScreen} />
    <Route path="/pools" component={MyPoolsScreen} />
    <Route path="/login" component={LoginScreen} />
    <Route path="/signup" component={SignUpScreen} />
    <Route path="/create" component={CreateTournamentScreen} />
    <Route path="/waiting" component={WaitingTournamentScreen} />
    <Route path="/live" component={LiveTournamentScreen} />
    <Route path="/loading" component={LoadingScreen} />
  </NativeRouter>
);

export default Routing;
