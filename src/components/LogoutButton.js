import gql from 'graphql-tag';
import React from 'react';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';

const LOGOUT_USER_MUTATION = gql`
  mutation LOGOUT_USER_MUTATION {
    signout {
      message
    }
  }
`;

const styles = StyleSheet.create({
  orangeButton: {
    marginLeft: '5%',
    margin: 10,
    width: '90%',
    backgroundColor: '#ef8354',

    borderColor: '#fefefe',
    borderWidth: 2,
  },
  orangeButtonText: {

    fontSize: 20,
  },
});

const LogoutButton = ({navigation}) => {
  const [signout, {data} ] = useMutation(LOGOUT_USER_MUTATION)
  return(

      <Button
        block
        style={styles.orangeButton}
        onPress={async () => {
          await signout();
          props.navigate();
        }}
      >
        <Text style={styles.orangeButtonText}>Log Out</Text>
      </Button>

);
      }
export default LogoutButton;
