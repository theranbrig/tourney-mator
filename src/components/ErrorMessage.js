import React, { useState } from 'react';
import { View, Text } from 'native-base';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    backgroundColor: '#fc3',
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
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <View key={i}>
        <Text>
          <strong>Oops!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </Text>
      </View>
    ));
  }
  return (
    <View>
      <Text data-test='graphql-error'>{error.replace('GraphQL error: ', '')}</Text>
    </View>
  );
};

export default DisplayError;
