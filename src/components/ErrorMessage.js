import React, { useState } from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    backgroundColor: '#ef8354',
    padding: 10,
    width: '90%',
    borderRadius: 5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'graduate',
  },
});

const DisplayError = ({ error }) => {
  if (!error || !error.message) {
    return null;
  }
  console.log('errrr', error);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>Foul!</Text>
        <Text style={styles.text}>{error.message}</Text>
      </View>
    </>
  );
};

export default DisplayError;
