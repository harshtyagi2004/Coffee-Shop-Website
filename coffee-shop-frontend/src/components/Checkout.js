import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    zip: '',
    mobile: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/Checkout', {
        amount: subtotal,
      });

      const { order } = response.data;
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Coffee Hop',
        description: 'Order for Coffee Hop',
        order_id: order.id,
        handler: function(response) {
          alert('Payment successful! Order ID: ' + response.razorpay_payment_id);
          clearCart();
          navigate('/');
        },
        prefill: {
          name: 'Customer Name', // Prefill with user data
          email: 'customer@example.com',
          contact: shippingDetails.mobile,
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

    } catch (error) {
      console.error('Checkout error:', error);
      alert('An error occurred during checkout.');
    }
  };

  const isCartEmpty = cartItems.length === 0;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h3>Shipping Address</h3>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" value={shippingDetails.address} onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input type="text" className="form-control" value={shippingDetails.city} onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Zip Code</label>
              <input type="text" className="form-control" value={shippingDetails.zip} onChange={(e) => setShippingDetails({ ...shippingDetails, zip: e.target.value })} />
            </div>
            <div className="mb-3">
              <label className="form-label">Mobile Number</label>
              <input type="tel" className="form-control" value={shippingDetails.mobile} onChange={(e) => setShippingDetails({ ...shippingDetails, mobile: e.target.value })} />
            </div>
            <div className="text-end">
              <button className="btn btn-primary" onClick={handleNext}>Next: Payment</button>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h3>Payment Method</h3>
            <div className="d-flex justify-content-between mt-4">
              <button className="btn btn-secondary" onClick={handleBack}>Back</button>
              <button className="btn btn-success" onClick={handlePlaceOrder}>Place Order</button>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mt-5">
      {isCartEmpty ? (
        <p className="text-center">Your cart is empty. Please add items to proceed.</p>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className="card p-4">
              <div className="d-flex justify-content-between mb-4">
                <h2 className="mb-0">Complete Payment</h2>
              </div>
              {renderStep()}
            </div>
          </div>
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card">
              <div className="card-body">
                <h5>Price Details</h5>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Delivery Fee</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total Amount</strong>
                  <strong>₹{subtotal}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;