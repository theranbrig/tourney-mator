import { createSwitchNavigator, createStackNavigator } from 'react-navigation';
import MyPoolsScreen from '../screens/MyPoolsScreen';
import CreateTournamentScreen from '../screens/CreateTournamentScreen';
import WaitingTournamentScreen from '../screens/WaitingTournamentScreen';
import LiveTournamentScreen from '../screens/LiveTournamentScreen';

export const SetupTournamentNavigator = createStackNavigator({
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

export const MainTournamentNavigator = createSwitchNavigator({
  SetupTournament: {
    screen: SetupTournamentNavigator,
  },
  LiveTournament: {
    screen: LiveTournamentScreen,
  },
});
