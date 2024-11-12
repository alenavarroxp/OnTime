import { Clock } from "lucide-react";
import React, { useState, useMemo } from "react";
import TimeInput from "./TimeInput";
import { getOnTime } from '../utils/getOnTime';
import moment from 'moment';
import type { Moment } from 'moment';
import UpdatedTime from "./UpdatedTime";
import NotificationButton from "./NotificationButton";

export default function Container() {
  const [startTime, setStartTime] = useState(moment());
  const [workDuration, setWorkDuration] = useState({ hours: undefined, minutes: undefined });

  const handleStartTimeChange = (newTime: Moment | null) => {
    setStartTime(newTime || moment());
  };

  const handleWorkDurationChange = (type: 'hours' | 'minutes', value: number) => {
    setWorkDuration((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const updatedTime = useMemo(() => {
    if (startTime && workDuration.hours !== undefined && workDuration.minutes !== undefined) {
      return getOnTime(startTime, { hours: workDuration.hours, minutes: workDuration.minutes });
    }
    return null;
  }, [startTime, workDuration]);

  return (
    <div className="flex flex-col items-center rounded-lg border-2 border-white bg-slate-950 bg-opacity-25 mt-5 p-3 justify-around">
      <div className="p-3 flex justify-around w-full">
        <TimeInput
          id="start"
          title="Start Time"
          icon={<Clock size={20} className="text-white" />}
          value={startTime}
          onChange={handleStartTimeChange}
        />
        <TimeInput
          id="work"
          title="Work Duration"
          icon={<Clock size={20} className="text-white" />}
          workDuration={workDuration}
          onWorkDurationChange={handleWorkDurationChange}
          startTime={startTime}
        />
      </div>
      {updatedTime && (
        <NotificationButton updatedTime={updatedTime} />
      )}
    </div>
  );
}
