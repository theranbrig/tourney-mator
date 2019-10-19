import React, { useState } from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    backgroundColor: '#fc3',
    padding: 10,
    borderColor: '#fff',
    borderWidth: 2,
    marginTop: 10,
    width: '100%',
  },
  text: {
    color: '#7a0019',
    textAlign: 'center',
    fontFamily: 'graduate',
  },
});
const DisplayError = ({ error, errorMessage }) => {
  if (errorMessage)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>FOUL!!!</Text>
        <Text style={styles.text}>{errorMessage.replace('GraphQL error: ', '')}</Text>
      </View>
    );
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <View style={styles.container}>
        <Text style={styles.text}>FOUL!!!</Text>
        <Text style={styles.text}>{error.message.replace('GraphQL error: ', '')}</Text>
      </View>
    ));
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FOUL!!!</Text>
      <Text style={styles.text}>{error.message.replace('GraphQL error: ', '')}</Text>
    </View>
  );
};

export default DisplayError;
