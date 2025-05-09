import { Trash2, Calendar } from 'lucide-react';
import { CartItem as CartItemType } from '../context/CartContext';
import { formatDate } from '../utils/dateUtils';

interface CartItemProps {
  item: CartItemType;
  onRemove: (carId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onRemove }) => {
  const { car, startDate, endDate, totalPrice } = item;
  
  return (
    <div className="flex flex-col sm:flex-row border rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="sm:w-1/4 mb-4 sm:mb-0">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-32 object-cover rounded-md"
        />
      </div>
      
      <div className="sm:w-3/4 sm:pl-4 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-bold">{car.brand} {car.model}</h3>
            <p className="text-sm text-gray-600">{car.year} • {car.type}</p>
          </div>
          <button 
            className="text-red-500 hover:text-red-700"
            onClick={() => onRemove(car.id)}
            aria-label="Remove item"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-2 space-y-1">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {formatDate(startDate)} - {formatDate(endDate)}
            </span>
          </div>
          <p className="text-sm text-gray-600">
            ${car.dailyRate}/day
          </p>
        </div>
        
        <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {calculateDays(startDate, endDate)} days
          </div>
          <div className="font-bold text-lg">
            ${totalPrice}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate the number of days between two dates
const calculateDays = (startDate: Date, endDate: Date): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export default CartItem;