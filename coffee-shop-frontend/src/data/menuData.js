import espresso from '../images/Classic Espresso.png';
import cappuccino from '../images/Cappuccino.png';
import chocolateShake from '../images/Chocolate Shake.png';
import veggieSandwich from '../images/Veggie Sandwich.png';
import coffeeBeans from '../images/Coffee Beans.png';

const menuItems = [
  // Coffee
  {
    id: 1,
    name: "Classic Espresso",
    description: "A strong, full-bodied shot of espresso.",
    price: 120,
    category: "coffee",
    image: espresso,
  },
  {
    id: 2,
    name: "Cappuccino",
    description: "Rich espresso with steamed milk foam.",
    price: 150,
    category: "coffee",
    image: cappuccino,
  },
  // Shakes
  {
    id: 3,
    name: "Chocolate Shake",
    description: "Creamy chocolate shake topped with whipped cream.",
    price: 180,
    category: "shakes",
    image: chocolateShake,
  },
  // Snacks
  {
    id: 4,
    name: "Veggie Sandwich",
    description: "Fresh veggies and cheese on toasted bread.",
    price: 100,
    category: "snacks",
    image: veggieSandwich,
  },
  // Products
  {
    id: 5,
    name: "Coffee Beans",
    description: "Our special blend of roasted coffee beans.",
    price: 350,
    category: "products",
    image: coffeeBeans,
  },
];

export default menuItems;