import React, { useEffect, useRef, useState } from "react";

const Timer = ({ expiryDate }) => {
  const [seconds, setSeconds] = useState('');
  const [minutes, setMinutes] = useState('');
  const [hours, setHours] = useState('');
  const [display, setDisplay] = useState('')

  const intervalRef = useRef();

  useEffect(() => {
   intervalRef.current = setInterval(() => {
      timeLeft(expiryDate);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [expiryDate]);

  function timeLeft(expiryDate) {
    const remaining = expiryDate - Date.now();

    const timeLeftInSeconds = remaining / 1000;
    const timeLeftInMinutes = timeLeftInSeconds / 60;
    const timeLeftInHours = timeLeftInMinutes/ 60;

    const secondsText = Math.floor(timeLeftInSeconds % 60);
    const minutesText = Math.floor(timeLeftInMinutes % 60);
    const hoursText = Math.floor(timeLeftInHours % 60);

    
    setHours(hoursText);
    setMinutes(minutesText);
    setSeconds(secondsText);
    let timeToShow = hoursText.toString() + 'h ' + minutesText.toString() + 'm ' + secondsText.toString() + 's'
    
    setDisplay(timeToShow)
  }

  if (hours < 0 && minutes < 0 && seconds < 0) {
    clearInterval(intervalRef.current)
    return '';
  } else {
    return (
      <div className="de_countdown">
        {display}
      </div>
    );
  }
};

export default Timer;