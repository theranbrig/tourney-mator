import React, { useContext } from 'react';
import { Button, Text, View, H1 } from 'native-base';
import SpinningImage from 'react-native-spinning-image';
import { StatusBar, StyleSheet } from 'react-native';
import { UserContext } from '../src/utilities/UserContext';
import Layout from '../src/utilities/Layout';

const styles = StyleSheet.create({
  mainButton: {
    marginTop: 10,
    borderColor: '#f3f3f3',
    backgroundColor: '#7a0019',
    borderWidth: 2,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 0,
  },
  mainButtonText: {
    fontSize: 20,
    color: '#fc3',
    fontFamily: 'graduate',
  },

  form: {
    width: '90%',
    backgroundColor: '#7a0019',
  },
  contentArea: {
    backgroundColor: '#fc3',
  },
  title: {
    textAlign: 'center',
    color: '#ffcc33',
    fontFamily: 'graduate',
    marginBottom: 10,
    fontSize: 24,
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7a0019',
  },
});

const LoadingScreen = ({ history }) => {
  const { user, userLoading } = useContext(UserContext);
  console.log(history.location.state.destination);

  if (user) {
    history.push(history.location.state.destination);
  }

  return (
    <Layout>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fc3' }}>
        <H1 style={{ fontFamily: 'graduate', color: '#7a0019' }}>Tourney-mator</H1>
        <View style={{ height: 350 }}>
          <SpinningImage
            speed={15000}
            height={200}
            width={300}
            source="https://res.cloudinary.com/dq7uyauun/image/upload/v1567483827/BRACKETBALL_copy.png"
          />
        </View>
      </View>
    </Layout>
  );
};

export default LoadingScreen;
