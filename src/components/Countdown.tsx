import React, { useState, useEffect } from 'react';
import moment from 'moment';

interface CountdownTimerProps {
  updatedTime: moment.Moment;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ updatedTime }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const currentTime = moment();
    const diff = updatedTime.diff(currentTime); // Diferencia en milisegundos
    const duration = moment.duration(diff);

    return {
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds(),
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = calculateTimeLeft();
      if (remainingTime.hours <= 0 && remainingTime.minutes <= 0 && remainingTime.seconds <= 0) {
        clearInterval(interval); // Detenemos el contador cuando llegue a cero
      }
      setTimeLeft(remainingTime); // Actualizamos el estado con el tiempo restante
    }, 1000);

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(interval);
  }, [updatedTime]);

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max text-white">
        
      <div className="flex flex-col">
        <span className="countdown text-5xl">
          <span style={{ '--value': timeLeft.hours } as React.CSSProperties}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown text-5xl">
          <span style={{ '--value': timeLeft.minutes } as React.CSSProperties}></span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown text-5xl">
          <span style={{ '--value': timeLeft.seconds } as React.CSSProperties}></span>
        </span>
        sec
      </div>
    </div>
  );
};
export default CountdownTimer;
