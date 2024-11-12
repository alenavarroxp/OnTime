// UpdatedTime.tsx
import React from 'react';
import { Clock } from 'lucide-react'; // Asegúrate de instalar react-feather si no lo tienes
import moment from 'moment';

interface UpdatedTimeProps {
  updatedTime: moment.Moment;
}

const UpdatedTime: React.FC<UpdatedTimeProps> = ({ updatedTime }) => {
  return (
    <div className="text-white mt-6 flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-4 shadow-lg">
      <div className="flex items-center space-x-2">
        <Clock size={24} className="text-white" />
        <h3 className="text-2xl font-semibold">{updatedTime.format('hh:mm A')}</h3>
      </div>
    </div>
  );
};

export default UpdatedTime;
