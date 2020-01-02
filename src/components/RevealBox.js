import React, { useState } from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Spring, animated } from 'react-spring/renderprops-native';
import SpecialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedView = animated(View);

const styles = {
  margin: 0,
  alignItems: 'center',
  justifyContent: 'center',
};

const RevealBox = ({ children, propHeight, buttonTitle, propBackground }) => {
  const [collapse, setCollapse] = useState(false);
  return (
    <Spring
      native
      from={{ height: 0, opacity: 0 }}
      to={{ height: collapse ? propHeight : 0, opacity: collapse ? 1 : 0 }}
      
    >
      {props => (
        <TouchableOpacity onPressIn={() => setCollapse(!collapse)}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              textAlign: 'center',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: '#fc3',
              borderBottomColor: '#fff',
              borderBottomWidth: 2,
              borderTopColor: '#fff',
              borderTopWidth: 2,
              marginTop: 5,
            }}
          >
            <Text
              style={{
                color: '#7a0019',
                fontFamily: 'graduate',
                fontSize: 16,
              }}
            >
              {buttonTitle}
            </Text>
            <SpecialIcon name={!collapse ? 'chevron-up' : 'chevron-down'} size={30} color="#7a0019" />
          </View>
          <AnimatedView style={{ ...styles, ...props, opacity: collapse ? 1 : 0, backgroundColor: propBackground }}>
            {children}
          </AnimatedView>
        </TouchableOpacity>
      )}
    </Spring>
  );
};

export default RevealBox;
