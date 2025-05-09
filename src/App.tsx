import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import CarDetailPage from './pages/CarDetailPage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="car/:id" element={<CarDetailPage />} />
            <Route path="cart" element={<CartPage />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;