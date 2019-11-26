import React from 'react';
import { View, Text } from 'native-base';
import SpinningImage from 'react-native-spinning-image';

const GoldSpinner = () => {
  return (
    <View style={{ height: 350 }}>
      <SpinningImage
        speed={15000}
        height={200}
        width={300}
        source="https://res.cloudinary.com/dq7uyauun/image/upload/v1568344579/BRACKETBALL_opposite_2.png"
      />
    </View>
  );
};

export default GoldSpinner;
