import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import menuItems from '../data/menuData';
import './Menu.css';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useContext(CartContext);
  const [quantities, setQuantities] = useState({});

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const handleAddClick = (item) => {
    const quantity = quantities[item.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart(item);
    }
    setQuantities({ ...quantities, [item.id]: 1 });
  };

  const handleQuantityChange = (id, change) => {
    setQuantities((prevQuantities) => {
      const newQuantity = (prevQuantities[id] || 1) + change;
      return { ...prevQuantities, [id]: newQuantity > 0 ? newQuantity : 1 };
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Our Menu</h1>
      <div className="text-center mb-4">
        <button className={`btn me-2 ${activeCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCategory('all')}>All</button>
        <button className={`btn me-2 ${activeCategory === 'coffee' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCategory('coffee')}>Coffee</button>
        <button className={`btn me-2 ${activeCategory === 'shakes' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCategory('shakes')}>Shakes</button>
        <button className={`btn me-2 ${activeCategory === 'snacks' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCategory('snacks')}>Snacks</button>
        <button className={`btn me-2 ${activeCategory === 'products' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setActiveCategory('products')}>Products</button>
      </div>
      <div className="row">
        {filteredItems.map((item) => (
          <div key={item.id} className="col-md-4 mb-4 menu-card-container">
            <div className="card h-100 menu-card">
              <img src={item.image} className="card-img-top menu-card-image" alt={item.name} />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p className="card-text"><strong>Price: ₹{item.price}</strong></p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                  <span className="mx-2">{quantities[item.id] || 1}</span>
                  <button className="btn btn-sm btn-outline-secondary" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddClick(item)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Menu;