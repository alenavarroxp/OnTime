// src/utils/getOnTime.ts
import type { Moment } from 'moment';
import moment from 'moment';

/**
 * Suma una duración de tiempo (horas y minutos) a un momento dado.
 * 
 * @param value - El momento original.
 * @param workDuration - El objeto que contiene las horas y minutos a sumar.
 * @returns El nuevo momento después de la suma.
 */
export function getOnTime(value: Moment, workDuration: { hours: number; minutes: number }): Moment {
  const newTime = value.clone(); // Clonamos el valor para no modificar el original
  return newTime.add(workDuration.hours, 'hours').add(workDuration.minutes, 'minutes');
}
