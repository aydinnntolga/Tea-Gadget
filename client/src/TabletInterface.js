import React, { useState, useEffect } from 'react';
import './TabletInterface.css'; // Make sure this points to the correct file

const TabletInterface = () => {
  // State for the countdown (in seconds)
  const [countdown, setCountdown] = useState(20 * 60); // 20 minutes
  const [timerActive, setTimerActive] = useState(false);
  const [teaStatus, setTeaStatus] = useState('finished'); // 'brewing', 'ready', 'finished'

  useEffect(() => {
    let interval = null;
    if (timerActive && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((currentCountdown) => currentCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setTeaStatus('ready');
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, countdown]);

  // Event handlers
  const startBrewing = () => {
    setCountdown(20 * 60); // Reset to 20 minutes
    setTimerActive(true);
    setTeaStatus('brewing');
  };

  const teaReady = () => {
    setCountdown(0);
    setTeaStatus('ready');
  };

  const teaFinished = () => {
    setCountdown(20 * 60); // Reset to 20 minutes
    setTeaStatus('finished');
  };

  // Convert seconds to MM:SS format
  const formatTime = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="tablet-interface-container">
      <div className="buttons">
        <button onClick={startBrewing}>Çay Demleniyor</button>
        <button onClick={teaReady}>Çay Hazır</button>
        <button onClick={teaFinished}>Çay Bitti</button>
      </div>
      <div className="countdown">
        <h1>{'Hazır olmasına: ' + formatTime() + ' dakika kaldı.'}</h1>
      </div>
      <div className="status">
        <h2 style={{ color: teaStatus === 'ready' ? 'green' : 'red' }}>
          {teaStatus === 'ready' ? 'Çay Hazır' : 'Çay Bitti'}
        </h2>
      </div>
    </div>
  );
};

export default TabletInterface;
