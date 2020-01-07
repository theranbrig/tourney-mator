import React, { useEffect, useState, useInterval } from 'react';
import { View, Text } from 'native-base';

const Timer = ({ selectUserFunction, resetTimer }) => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(true);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds( seconds - 1);
        if (seconds === 0) {
          selectUserFunction();
          clearInterval(interval);
          setSeconds(60);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View>
      <Text>{seconds}</Text>
    </View>
  );
};

export default Timer;
