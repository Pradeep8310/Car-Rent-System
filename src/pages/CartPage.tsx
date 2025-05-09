import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, CreditCard } from 'lucide-react';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);
  
  useEffect(() => {
    // If cart becomes empty and we're not in checkout mode, redirect to home
    if (cartItems.length === 0 && !isCheckingOut) {
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [cartItems, navigate, isCheckingOut]);
  
  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      clearCart();
      alert('Your rental has been successfully booked!');
      navigate('/');
    }, 1500);
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6">
        <div className="text-center">
          {isCheckingOut ? (
            <div>
              <div className="animate-pulse inline-flex items-center justify-center p-6 bg-emerald-100 text-emerald-600 rounded-full mb-4">
                <CreditCard className="h-12 w-12" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Processing your order...</h2>
              <p className="text-gray-600">Please wait while we confirm your rental booking.</p>
            </div>
          ) : (
            <>
              <div className="inline-flex items-center justify-center p-6 bg-gray-100 rounded-full mb-4">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">You haven't added any cars to your cart yet.</p>
              <button 
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                Browse Cars
              </button>
            </>
          )}
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')} 
            className="mr-4 text-emerald-600 hover:text-emerald-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-2xl font-bold">Your Cart</h1>
        </div>
        <span className="text-sm text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <CartItem 
                key={item.car.id} 
                item={item} 
                onRemove={removeFromCart} 
              />
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div key={item.car.id} className="flex justify-between text-sm">
                  <span>{item.car.brand} {item.car.model}</span>
                  <span>${item.totalPrice}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalAmount}</span>
              </div>
            </div>
            
            <button
              onClick={handleCheckout}
              className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 flex items-center justify-center"
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;