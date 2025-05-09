import { Link } from 'react-router-dom';
import { Car as CarIcon, Users, Zap, RefreshCw } from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Not Available</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold text-gray-900">{car.brand} {car.model}</h3>
            <p className="text-sm text-gray-600">{car.year} {car.type}</p>
          </div>
          <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm font-semibold">
            ${car.dailyRate}/day
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            <span>{car.seats} Seats</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Zap className="h-4 w-4 mr-1" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <RefreshCw className="h-4 w-4 mr-1" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CarIcon className="h-4 w-4 mr-1" />
            <span>{car.type}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <Link 
            to={`/car/${car.id}`}
            className="w-full block text-center py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors duration-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;