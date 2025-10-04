import React from 'react';
import './AnimatedCoffeeCup.css';
import coffeeCup from '../assets/coffee cup.png'; // Make sure this path is correct

const AnimatedCoffeeCup = () => {
  return (
    <div className="coffee-cup-container">
      <img
        src={coffeeCup}
        alt="Animated Coffee Cup"
        className="animated-coffee-cup"
      />
    </div>
  );
};

export default AnimatedCoffeeCup;