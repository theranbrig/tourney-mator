import React, { useEffect, useState } from 'react';
import { View, Text } from 'native-base';

const Timer = ({ selectUserFunction, resetTimer }) => {
  const [time, setTime] = useState(90);

  const startTimer = () => {
    function display() {
      const intervalId = setInterval(() => {
        if (time === 0) {
          selectUserFunction();
          clearInterval(intervalId);
        }
        setTime(time - 1);
      }, 1000);
    }
    display();
  };

  useEffect(() => {
    // exit early when we reach 0
    if (!time) selectUserFunction();

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [time]);

  return (
    <View>
      <Text>{time}</Text>
    </View>
  );
};

export default Timer;
