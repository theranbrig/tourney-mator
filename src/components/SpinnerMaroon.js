import React from 'react';
import { View, Text } from 'native-base';
import SpinningImage from 'react-native-spinning-image';

const MaroonSpinner = () => {
  return (
    <View style={{ height: 350 }}>
      <SpinningImage
        speed={15000}
        height={200}
        width={300}
        source="https://res.cloudinary.com/dq7uyauun/image/upload/v1567483827/BRACKETBALL_copy.png"
      />
    </View>
  );
};

export default MaroonSpinner;
