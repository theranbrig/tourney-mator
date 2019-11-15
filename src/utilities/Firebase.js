import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import '@firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyD5xRHDREmUCdt9JhZpsxVC0cG0pWO8qZk',
  authDomain: 'bracketball-83683.firebaseapp.com',
  databaseURL: 'https://bracketball-83683.firebaseio.com',
  projectId: 'bracketball-83683',
  storageBucket: 'bracketball-83683.appspot.com',
  messagingSenderId: '129929714791',
  appId: '1:129929714791:web:49de46b1860dd8445f88c2',
  measurementId: 'G-XC986894ET',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext();

const dbh = firebase.firestore();

const FirebaseProvider = ({ children }) => {
  const setLiveUserData = userId => {
    dbh
      .collection('users')
      .doc(userId)
      .set({
        waitingTournament: '',
        liveTournament: '',
        currentPick: null,
        myPicks: [],
      });
  };

  const createTournamentData = (tournamentId, userId) => {
    dbh
      .collection('tournaments')
      .doc(tournamentId)
      .set({
        isLive: false,
        isWaiting: true,
        currentPick: 0,
        pickOrder: [],
        currentMembers: [userId],
      });
  };

  const [
    userFirebaseData: value,
    userFirebaseLoading: loading,
    userFirebaseError: error,
  ] = useCollection(dbh.collection('users'), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        userFirebaseData,
        userFirebaseError,
        userFirebaseLoading,
        createTournamentData,
        setLiveUserData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FirebaseProvider;
