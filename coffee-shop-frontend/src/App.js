import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import AccountSettings from './components/AccountSettings';
import Menu from './components/Menu';
import TableBookingForm from './components/TableBookingForm';
import Cart from './components/Cart';
import Checkout from './components/Checkout'; // New: Import the Checkout component
import Footer from './components/Footer';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/settings" element={<AccountSettings />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/book-table" element={<TableBookingForm />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} /> // New: Checkout route
          </Routes>
          <Footer/>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;