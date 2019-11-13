import React from "react";
import gql from "graphql-tag";
import PropTypes from "prop-types"

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5xRHDREmUCdt9JhZpsxVC0cG0pWO8qZk",
  authDomain: "bracketball-83683.firebaseapp.com",
  databaseURL: "https://bracketball-83683.firebaseio.com",
  projectId: "bracketball-83683",
  storageBucket: "bracketball-83683.appspot.com",
  messagingSenderId: "129929714791",
  appId: "1:129929714791:web:49de46b1860dd8445f88c2",
  measurementId: "G-XC986894ET"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext();

const dbh = firebase.firestore();

const FirebaseProvider = ({ children }) => {
  const liveUserData = userId => {
    dbh
      .collection("users")
      .doc(userId)
      .set({
        waitingTournament: "",
        liveTournament: "",
        currentPick: null,
        myPicks: []
      });
  };

  const createLiveTournament = tournamentId => {
    dbh
      .collection("tournament")
      .doc(tournamentId)
      .set({
        currentlyLive: False,
        currentlyWaiting: True,
        currentUsers: [],
        currentPick: 0
      });
  };

  const [
    firebaseUserValue: value,
    firebaseUserLoading: loading,
    firebaseUserError: error
  ] = useCollection(firebase.firestore().collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true }
  });


  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        firebaseUserValue,
        firebaseUserLoading,
        firebaseUserError
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

FirebaseProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default FirebaseProvider;
