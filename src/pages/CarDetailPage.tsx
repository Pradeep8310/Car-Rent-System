import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, Zap, RefreshCw, Check, ArrowLeft } from 'lucide-react';
import { cars } from '../data/cars';
import DateRangePicker from '../components/DateRangePicker';
import { useCart } from '../context/CartContext';
import { calculateTotalPrice } from '../utils/dateUtils';

const CarDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  
  const car = cars.find(car => car.id === Number(id));
  
  useEffect(() => {
    if (startDate && endDate && car) {
      const price = calculateTotalPrice(car.dailyRate, startDate, endDate);
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [startDate, endDate, car]);
  
  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Car Not Found</h2>
        <p className="mb-6">The car you are looking for does not exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          Back to Home
        </button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (startDate && endDate && car) {
      addToCart({
        car,
        startDate,
        endDate,
        totalPrice
      });
      navigate('/cart');
    }
  };
  
  const isBookingFormValid = startDate && endDate && totalPrice > 0;
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <button 
        onClick={() => navigate('/')} 
        className="flex items-center text-emerald-600 hover:text-emerald-800 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to cars
      </button>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={car.image} 
              alt={`${car.brand} ${car.model}`} 
              className="h-64 md:h-full w-full object-cover"
            />
          </div>
          
          <div className="md:w-1/2 p-6 md:p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{car.brand} {car.model}</h1>
                <p className="text-gray-600">{car.name} • {car.year}</p>
              </div>
              <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-bold">
                ${car.dailyRate}/day
              </div>
            </div>
            
            <p className="mt-4 text-gray-700">{car.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-emerald-600" />
                <span>{car.seats} Seats</span>
              </div>
              <div className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-emerald-600" />
                <span>{car.fuelType}</span>
              </div>
              <div className="flex items-center">
                <RefreshCw className="h-5 w-5 mr-2 text-emerald-600" />
                <span>{car.transmission}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                <span>{car.year}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-emerald-600" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-200">
          <h2 className="text-xl font-bold mb-4">Book this car</h2>
          
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={setStartDate}
            onEndDateChange={setEndDate}
          />
          
          {startDate && endDate && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>Daily Rate:</span>
                <span>${car.dailyRate}/day</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg border-t border-gray-300 pt-2 mt-2">
                <span>Total Price:</span>
                <span>${totalPrice}</span>
              </div>
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            disabled={!isBookingFormValid || !car.available}
            className={`w-full mt-6 py-3 rounded-md font-medium text-white ${
              isBookingFormValid && car.available
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {!car.available 
              ? 'Car Not Available' 
              : !isBookingFormValid 
                ? 'Select Dates to Continue' 
                : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;