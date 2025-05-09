import { useState } from 'react';
import { Search } from 'lucide-react';
import CarCard from '../components/CarCard';
import { cars as allCars } from '../data/cars';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [carType, setCarType] = useState('');
  
  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = carType ? car.type === carType : true;
    
    return matchesSearch && matchesType;
  });
  
  const carTypes = Array.from(new Set(allCars.map(car => car.type)));
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <section className="mb-8">
        <div className="bg-emerald-700 rounded-xl p-6 sm:p-10 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Find Your Perfect Ride</h1>
            <p className="text-lg sm:text-xl mb-6 max-w-2xl">
              Choose from our premium selection of vehicles for your next journey.
              Affordable rates, exceptional service.
            </p>
            
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-xl">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by brand or model..."
                    className="w-full px-4 py-3 pr-10 rounded-md border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                
                <select
                  className="px-4 py-3 rounded-md border-0 text-gray-900 focus:ring-2 focus:ring-emerald-500"
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {carTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          {/* Background pattern for hero section */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600 opacity-50 transform -skew-x-12"></div>
        </div>
      </section>
      
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Available Cars</h2>
          <p className="text-gray-600">{filteredCars.length} cars found</p>
        </div>
        
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No cars match your search criteria.</p>
            <button 
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              onClick={() => {
                setSearchTerm('');
                setCarType('');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;