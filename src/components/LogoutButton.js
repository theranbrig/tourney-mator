import gql from 'graphql-tag';
import React, {useContext} from 'react';
import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { UserContext } from '../utilities/UserContext';

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

const LogoutButton = (props) => {
  const [signout, {data} ] = useMutation(LOGOUT_USER_MUTATION)
  const { userRefetch } = useContext(UserContext);
  return(
      <Button
        block
        style={styles.orangeButton}
        onPress={async () => {
          await signout();
          userRefetch();
          props.navigate();
        }}
      >
        <Text style={styles.orangeButtonText}>Log Out</Text>
      </Button>
);
      }
export default LogoutButton;
