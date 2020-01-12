import React, { useEffect, useState, useInterval } from 'react';
import { View, Text } from 'native-base';

const Timer = ({ selectUserFunction, resetTimer, isActive, propsSeconds }) => {
  const [seconds, setSeconds] = useState(propsSeconds);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
        if (seconds === 0) {
          selectUserFunction();
          clearInterval(interval);
          setSeconds(propsSeconds);
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      setSeconds(propsSeconds);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, seconds]);

  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontFamily: 'graduate', color: '#fc0', fontSize: 20, textAlign: 'center' }}>SHOT CLOCK</Text>
      <Text style={{ fontFamily: 'scoreboard', color: '#fc0', fontSize: 20, textAlign: 'center' }}>{seconds}</Text>
    </View>
  );
};

export default Timer;
