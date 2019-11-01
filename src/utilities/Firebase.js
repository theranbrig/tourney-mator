import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';

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

const FirebaseProvider = ({ children }) => {
  const hello = 'hello';

  const addToFirebase = name => {
    firebase
      .database()
      .ref('users')
      .set({ username: name });
  };

  return (
    <FirebaseContext.Provider
      value={{
        firebase,
        hello,
        addToFirebase,
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
