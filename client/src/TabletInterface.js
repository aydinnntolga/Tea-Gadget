import React, { useState, useEffect } from 'react';
import './TabletInterface.css'; // Ensure correct file path

const TabletInterface = () => {
  // State for multiple drinks
  const [drinks, setDrinks] = useState([
    { name: 'Çay', countdown: 20 * 60, originalCountdown: 20 * 60, status: 'finished', timerActive: false },
    { name: 'Kahve', countdown: 5 * 60, originalCountdown: 5 * 60, status: 'finished', timerActive: false },
    { name: 'Ihlamur', countdown: 10 * 60, originalCountdown: 10 * 60, status: 'finished', timerActive: false }
  ]);

  useEffect(() => {
    const intervals = drinks.map((drink, index) => {
      if (drink.timerActive) {
        return setInterval(() => {
          setDrinks(currentDrinks => {
            const newDrinks = [...currentDrinks];
            if (newDrinks[index].countdown > 0) {
              newDrinks[index].countdown -= 1;
            } else if (newDrinks[index].countdown === 0) {
              clearInterval(intervals[index]);
              newDrinks[index].status = 'ready';
              newDrinks[index].timerActive = false;
            }
            return newDrinks;
          });
        }, 1000);
      }
      return null;
    });
    return () => intervals.forEach(interval => interval && clearInterval(interval));
  }, [drinks]);

  // Event handlers
  const toggleBrewing = (index, status) => {
    setDrinks(currentDrinks => {
      const newDrinks = [...currentDrinks];
      newDrinks[index].status = status;
      if (status === 'brewing') {
        newDrinks[index].timerActive = true;
        newDrinks[index].countdown = newDrinks[index].originalCountdown;
      } else if (status === 'ready') {
        newDrinks[index].timerActive = false;
        newDrinks[index].countdown = newDrinks[index].originalCountdown;
      } else {
        newDrinks[index].timerActive = false;
      }
      return newDrinks;
    });
  };

  const formatTime = (countdown) => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const addNewDrink = () => {
    const name = prompt('İçecek adı nedir?', 'Yeni İçecek');
    const time = prompt('Hazırlanma süresi kaç dakika?', '20');
    if (name && time) {
      const countdown = parseInt(time, 10) * 60;
      setDrinks([...drinks, {
        name: name.charAt(0).toUpperCase() + name.slice(1),
        countdown: countdown,
        originalCountdown: countdown,
        status: 'finished',
        timerActive: false
      }]);
    }
  };

  return (
    <div className="tablet-interface-container">
      {drinks.map((drink, index) => (
        <div key={index} className="drink-row">
          <div className="drink-controls">
            <button onClick={() => toggleBrewing(index, 'brewing')}>{drink.name} Hazırlanıyor</button>
            <button onClick={() => toggleBrewing(index, 'ready')}>{drink.name} Hazır</button>
            <button onClick={() => toggleBrewing(index, 'finished')}>{drink.name} Bitti</button>
          </div>
          <div className="drink-status">
            <div className="countdown">{formatTime(drink.countdown)} dakika kaldı</div>
            <div className="status" style={{ color: drink.status === 'ready' ? 'green' : 'red' }}>
              {drink.status === 'ready' ? 'Hazır' : 'Bitti'}
            </div>
          </div>
          <div className="drink-row-separator"></div> {/* Added back the separator line for each row */}
        </div>
      ))}
      <div className="separator-line"></div> {/* Separator line before the plus button */}
      <button className="add-drink-button" onClick={addNewDrink}>+</button>
    </div>
  );
};

export default TabletInterface;
