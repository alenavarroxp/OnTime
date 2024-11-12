import { Clock } from 'lucide-react';

interface Props {
  title: string;
  description: string;
}

const MyComponent: React.FC<Props> = ({ title, description }) => {
  return (
    <div className="text-center pt-12 text-white flex justify-center items-center flex-col">
      <div className="flex justify-between items-center gap-4 pb-3">
        <h1 className="text-4xl font-bold">{title}</h1>
        <Clock size={28} className='mt-1' />
      </div>
      <p className="text-md text-gray-400 font-semibold">{description}</p>
    </div>
  );
};

export default MyComponent;
