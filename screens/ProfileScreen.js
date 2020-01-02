import React, { useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';
import Layout from '../src/utilities/Layout';
import LogoutButton from '../src/components/LogoutButton';
import { UserContext } from '../src/utilities/UserContext';
import BottomFooter from '../src/components/Footer';

const ProfileScreen = ({ history }) => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Layout title="Profile">
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Users Screen</Text>
          <Button title="Go to Home" onPress={() => history.push('/home')} />
          <Button title="Go back" onPress={() => history.push('/loading')} />
          <LogoutButton navigate={() => history.push('/login')} />
          <Text>{user.email}</Text>
          <Text>{user.username}</Text>
        </View>
      </Layout>
      <BottomFooter history={history} />
    </>
  );
};

export default ProfileScreen;

// import React, { Component } from 'react';
// import { Text, View, TouchableWithoutFeedback } from 'react-native';
// import { Spring, animated } from 'react-spring/renderprops-native';

// const AnimatedView = animated(View);

// const styles = {
//   flex: 1,
//   margin: 0,
//   backgroundColor: 'red',
//   alignItems: 'center',
//   justifyContent: 'center',
// };

// export default class App extends Component {
//   state = { flag: true };
//   toggle = () => this.setState(state => ({ flag: !state.flag }));
//   render() {
//     const { flag } = this.state;
//     return (
//       <Spring native from={{ margin: 0 }} to={{ margin: flag ? 100 : 0 }}>
//         {props => (
//           <TouchableWithoutFeedback onPressIn={() => this.toggle()}>
//             <AnimatedView style={{ ...styles, ...props }}>
//               <Text>{flag ? 'true' : 'false'}</Text>
//             </AnimatedView>
//           </TouchableWithoutFeedback>
//         )}
//       </Spring>
//     );
//   }
// }
