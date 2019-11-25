import React, { useState, useEffect } from 'react';
import { Text } from 'native-base';

const SelectOrder = () => {
  const [pickOrder, setPickOrder] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      console.log('Hello');
    }, 5000);
  }, [pickOrder]);

  return <Text>Hello</Text>;
};

export default SelectOrder;
