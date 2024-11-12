import React, { useState, useEffect } from 'react';
import { Button, CircularProgress } from '@mui/material';
import Push from 'push.js';
import CountdownTimer from './Countdown';
import moment from 'moment';
import UpdatedTime from './UpdatedTime';
import { toast, ToastContainer } from 'react-toastify';  // Importar react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Estilos para los toasts

interface NotificationButtonProps {
  updatedTime: moment.Moment;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({ updatedTime }) => {
  const [permission, setPermission] = useState(Notification.permission);
  const [isNotificationScheduled, setIsNotificationScheduled] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [prevUpdatedTime, setPrevUpdatedTime] = useState(updatedTime);  // Estado para manejar si el tiempo ha cambiado

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        setPermission(permission);
      });
    }
  }, []);

  useEffect(() => {
    setIsNotificationScheduled(false);  // Reset notification status when updatedTime changes
    setPrevUpdatedTime(updatedTime);    // Update previous time
  }, [updatedTime]);

  const handleNotifyClick = () => {
    if (permission === 'granted') {
      setIsButtonDisabled(true);  // Disable the button while scheduling the notification
      scheduleNotification(updatedTime);
    } else {
      alert('You do not have permission to receive notifications. Please enable it in your browser settings.');
    }
  };

  const scheduleNotification = (time: moment.Moment) => {
    const currentTime = moment();
    const delay = time.diff(currentTime, 'milliseconds');

    if (delay <= 0) {
      alert('The time has already passed.');
      return;
    }

    // Mostrar el toast inmediatamente
    toast.success(`Notification successfully scheduled at ${time.format('hh:mm A')}. Please do not close this window.`, {
      position: "top-right",
      autoClose: 5000,  // El toast desaparecerá después de 5 segundos
    });

    // Después de mostrar el toast, programamos la notificación
    setTimeout(() => {
      Push.create('Clock-In Time', {
        body: `Your working time has ended at ${time.format('hh:mm A')}`,
        icon: '/path-to-your-icon.png',
        timeout: 60000,
        onClick: () => {
          window.open('https://intranet.uclm.es/servicios/MisConsultas/GIP/marcajeVirtual.aspx', '_blank');
          setTimeout(() => {
            Push.close('Clock-In Time');  // Close the notification after 1 minute
          }, 60000);        },
      });

      setIsNotificationScheduled(true); // Marcar la notificación como programada
      setIsButtonDisabled(false); // Volver a habilitar el botón
    }, delay);  };
  return (
    <div className="mt-6">
      <CountdownTimer updatedTime={updatedTime} />
      <UpdatedTime updatedTime={updatedTime} />

      {!isButtonDisabled && !isNotificationScheduled && prevUpdatedTime.isSame(updatedTime) ? (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNotifyClick}
          disabled={isButtonDisabled || permission !== 'granted'}
          sx={{
            marginTop: 2,
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: isButtonDisabled ? '#aaa' : '#1976d2',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: isButtonDisabled ? '#aaa' : '#1565c0',
            },
          }}
        >
          Notify Me 
          
        </Button>
      ) : (
        <Button
          variant="outlined"
          disabled
          className=''
          sx={{
            marginTop: 2,
            padding: '10px 20px',
            fontSize: '16px',
            color: 'gray',
            borderColor: 'gray',
            '&:hover': {
              borderColor: 'gray',
              backgroundColor: 'transparent',
            },
          }}
        >
          Notification Scheduled
        </Button>
      )}

      {/* ToastContainer para mostrar los toasts */}
      <ToastContainer />
    </div>
  );
};

export default NotificationButton;
