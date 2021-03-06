import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost';
import UserProvider from './src/utilities/UserContext';
import FirebaseProvider from './src/utilities/Firebase';
import Routing from './navigation/NativeRouter';

export default function App(props) {
  const client = new ApolloClient({
    uri: 'http://localhost:4444',
  });

  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <ApolloProvider client={client}>
        <FirebaseProvider>
          <UserProvider>
            <AppLoading
              startAsync={loadResourcesAsync}
              onError={handleLoadingError}
              onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
          </UserProvider>
        </FirebaseProvider>
      </ApolloProvider>
    );
  }
  return (
    <ApolloProvider client={client}>
      <FirebaseProvider>
        <UserProvider>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <Routing />
          </View>
        </UserProvider>
      </FirebaseProvider>
    </ApolloProvider>
  );
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      // Images go here.
      require('./assets/images/goldBasketballOutline.png'),
      require('./assets/images/maroonBasketballOutlineSmall.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      graduate: require('./assets/fonts/graduate-regular.ttf'),
      scoreboard: require('./assets/fonts/DjbFridayNightLights-Z8jB.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
