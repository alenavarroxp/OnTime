import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import type { Moment } from 'moment';
import moment from 'moment';
import { getOnTime } from '../utils/getOnTime';

interface TimeInputProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  value?: Moment | null; // Hora de inicio (opcional para "work")
  onChange?: (newTime: Moment | null) => void; // Función para cambiar la hora de inicio
  workDuration?: { hours: number | undefined; minutes: number | undefined }; // Duración del trabajo (solo para "work")
  onWorkDurationChange?: (type: 'hours' | 'minutes', value: number) => void; // Función para cambiar la duración del trabajo
  startTime?: Moment; // Hora de inicio (solo para "work")
}

export default function TimeInput({
  id,
  title,
  icon,
  value,
  onChange,
  workDuration,
  onWorkDurationChange,
  startTime,
}: TimeInputProps) {
  const [localValue, setLocalValue] = useState<Moment | null>(value || moment()); // Estado local para la hora seleccionada


  useEffect(() => {
    if (value) setLocalValue(value); // Actualiza la hora local si la hora de inicio cambia
  }, [value]);

  // Función para manejar los cambios en las horas y minutos
  const handleWorkDurationChange = (type: 'hours' | 'minutes', value: number) => {
    if (onWorkDurationChange) {
      onWorkDurationChange(type, value); // Llamar la función del padre para actualizar la duración
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center text-white mb-4 space-x-2">
        {icon}
        <span className="text-base font-semibold">{title}</span>
      </div>

      {id === 'start' ? (
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <MobileTimePicker
            label="Start Time"
            closeOnSelect
            slotProps={{
              textField: {
                sx: {
                  color: 'white',
                  '& .MuiInputBase-root': {
                    color: 'white', // Texto en blanco
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white', // Etiqueta en blanco
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'white', // Borde blanco
                  },
                },
              },
            }}
            value={localValue}  // Enlazamos el valor con el estado local
            onChange={(newValue) => {
              setLocalValue(newValue);  // Actualizamos el valor de la hora seleccionada
              if (onChange) onChange(newValue); // Llamamos a la función onChange para propagar el cambio al componente padre
            }}
            orientation="landscape"
            openTo="hours"
            onAccept={() => console.log('Hora seleccionada:', localValue)}
          />
        </LocalizationProvider>
      ) : (
        <div className="flex space-x-4">
          {/* Selector de horas (máximo 8 horas) */}
          <FormControl className="w-24" variant="outlined" sx={{ color: 'white' }}>
            <InputLabel style={{ color: 'white' }}>Hours</InputLabel>
            <Select
              value={workDuration?.hours || 0}
              onChange={(e) => handleWorkDurationChange('hours', e.target.value as number)}
              label="Hours"
              sx={{
                color: 'white',
                '& .MuiSelect-icon': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiMenuItem-root': {
                  color: 'white',
                },
                '&:hover .MuiMenuItem-root': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              {/* Permitir solo horas entre 0 y 8 */}
              {Array.from({ length: 9 }, (_, index) => (
                <MenuItem key={index} value={index} sx={{ color: 'black' }}>
                  {String(index).padStart(2, '0')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Selector de minutos (solo 00, 15, 30, 45) */}
          <FormControl className="w-24" variant="outlined" sx={{ color: 'white' }}>
            <InputLabel style={{ color: 'white' }}>Minutes</InputLabel>
            <Select
              value={workDuration?.minutes || 0}
              onChange={(e) => handleWorkDurationChange('minutes', e.target.value as number)}
              label="Minutes"
              sx={{
                color: 'white',
                '& .MuiSelect-icon': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiMenuItem-root': {
                  color: 'white',
                },
                '&:hover .MuiMenuItem-root': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              {/* Permitir solo minutos 00, 15, 30, 45 */}
              {[0,1, 15, 30, 45].map((minute) => (
                <MenuItem key={minute} value={minute} sx={{ color: 'black' }}>
                  {String(minute).padStart(2, '0')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      )}


    </div>
  );
}
