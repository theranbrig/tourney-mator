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
    backgroundColor: '#ffcc33',
    borderWidth: 2,
    width: '90%',
    marginLeft: '5%',
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
  },
  contentArea: {
    backgroundColor: '#7a0019',
  },
  title: {
    textAlign: 'center',
    color: '#ffcc33',
    fontFamily: 'graduate',
    marginBottom: 10,
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
  if (userLoading) return <Text>Loading</Text>;
  if (user) {
    history.push('/home');
  }
  return (
    <Layout>
      <StatusBar barStyle="light-content" />
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7a0019' }}>
        <H1 style={{ fontFamily: 'graduate', color: '#ffcc33' }}>Tourney-mator</H1>
        <View style={{ height: 250 }}>
          <SpinningImage
            speed={15000}
            height={200}
            width={200}
            source="https://www.iconsdb.com/icons/preview/white/basketball-xxl.png"
          />
        </View>
        {!user && (
          <>
            <Button block style={styles.mainButton} onPress={() => history.push('/login')}>
              <Text style={styles.mainButtonText}>Login</Text>
            </Button>
            <Button block style={styles.mainButton} onPress={() => history.push('/signup')}>
              <Text style={styles.mainButtonText}>Sign Up</Text>
            </Button>
          </>
        )}
      </View>
    </Layout>
  );
};

export default LoadingScreen;
