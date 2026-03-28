// node seed.js  —  seeds admin, sample users, and full menu
const mongoose = require('mongoose');
const dotenv   = require('dotenv');
dotenv.config();

const User  = require('./models/User');
const Food  = require('./models/Food');
const Order = require('./models/Order');

const menuItems = [
  // Pizza
  { name: 'Cheese Burst Pizza', description: 'Rich cheese-stuffed crust with mozzarella, cheddar, and tomato sauce. A classic crowd-pleaser.', price: 549, category: 'Pizza', isFeatured: true, prepTime: '25-30 min', ratings: 4.8, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80' },
  { name: 'Margherita Pizza', description: 'Authentic Italian-style with fresh basil, ripe tomatoes, and premium mozzarella.', price: 449, category: 'Pizza', prepTime: '20-25 min', ratings: 4.6, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80' },
  { name: 'Veggie Supreme Pizza', description: 'Loaded with colourful bell peppers, olives, mushrooms, and sweet corn.', price: 499, category: 'Pizza', prepTime: '20-25 min', ratings: 4.5, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=800&q=80' },

  // Burgers
  { name: 'Classic Beef Burger', description: 'Juicy 120g beef patty, lettuce, tomato, pickles, and our signature Dadwals sauce.', price: 299, category: 'Burger', isFeatured: true, prepTime: '15-20 min', ratings: 4.9, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80' },
  { name: 'Veg Burger', description: 'Spiced aloo tikki patty with fresh veggies, cheese, and green chutney.', price: 199, category: 'Burger', prepTime: '10-15 min', ratings: 4.4, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80' },
  { name: 'Double Smash Burger', description: 'Two smashed beef patties, American cheese, caramelised onions, and Dadwals special sauce.', price: 399, category: 'Burger', prepTime: '20-25 min', ratings: 4.9, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80' },

  // Rolls
  { name: 'Veg Spring Rolls', description: 'Crispy golden rolls with mixed vegetables, tofu, and aromatic herbs. 6 pieces per serving.', price: 199, category: 'Rolls', prepTime: '15-20 min', ratings: 4.5, image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&q=80' },

  // Drinks
  { name: 'Classic Mojito', description: 'Fresh mint, lime, soda, and a hint of sugar. Refreshing and zesty. Mocktail version.', price: 149, category: 'Drinks', isFeatured: true, prepTime: '5 min', ratings: 4.8, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80' },
  { name: 'Virgin Strawberry Mojito', description: 'Muddled strawberries, fresh mint, lime, and sparkling water. Sweet and tangy.', price: 169, category: 'Drinks', prepTime: '5 min', ratings: 4.7, image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80' },
  { name: 'Lemon Iced Tea', description: 'Brewed black tea chilled with fresh lemon and a touch of honey. Perfectly balanced.', price: 129, category: 'Drinks', prepTime: '5 min', ratings: 4.5, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80' },

  // Shakes
  { name: 'Chocolate Fudge Shake', description: 'Thick Belgian chocolate milkshake with whipped cream and chocolate drizzle. Pure indulgence.', price: 249, category: 'Shakes', isFeatured: true, prepTime: '10 min', ratings: 4.9, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&q=80' },
  { name: 'Strawberry Cheesecake Shake', description: 'Fresh strawberries blended with creamy cheesecake ice cream and graham crackers.', price: 269, category: 'Shakes', prepTime: '10 min', ratings: 4.8, image: 'https://images.unsplash.com/photo-1568901839119-631418a3910d?w=800&q=80' },
  { name: 'Oreo Blizzard Shake', description: 'Vanilla ice cream blended with crushed Oreos. A dessert in a glass.', price: 259, category: 'Shakes', prepTime: '10 min', ratings: 4.8, image: 'https://images.unsplash.com/photo-1553530979-fbb9e4aee36f?w=800&q=80' },

  // Sides
  { name: 'Loaded Cheese Fries', description: 'Crispy golden fries smothered in cheddar cheese sauce, jalapeños, and sour cream.', price: 199, category: 'Sides', isFeatured: true, prepTime: '10-15 min', ratings: 4.7, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80' },
  { name: 'Onion Rings', description: 'Beer-battered crispy onion rings served with tangy ranch dipping sauce.', price: 159, category: 'Sides', prepTime: '10-15 min', ratings: 4.5, image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800&q=80' },

  // Desserts
  { name: 'Brownie Sundae', description: 'Warm fudge brownie topped with vanilla ice cream and chocolate sauce.', price: 229, category: 'Desserts', prepTime: '10 min', ratings: 4.9, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80' },
  { name: 'Nutella Crepe', description: 'Thin French crepe spread with Nutella, sliced bananas, and powdered sugar.', price: 199, category: 'Desserts', prepTime: '10 min', ratings: 4.8, image: 'https://images.unsplash.com/photo-1519676867240-f03562e64548?w=800&q=80' },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  await Food.deleteMany({});
  await Order.deleteMany({});
  console.log('Cleared DB');

  const admin = await User.create({ name: 'Admin Dadwals', email: 'admin@dadwals.com', password: 'admin1234', role: 'admin', phone: '+92 300 1234567', address: 'Dadwals HQ, Lahore' });
  const user  = await User.create({ name: 'Ahmed Khan', email: 'ahmed@test.com', password: 'test1234', phone: '+92 311 9876543', address: 'DHA Phase 5, Lahore' });

  const foods = await Food.insertMany(menuItems);

  // Sample order
  await Order.create({
    userId: user._id,
    items: [
      { foodId: foods[0]._id, name: foods[0].name, price: foods[0].price, quantity: 1, image: foods[0].image },
      { foodId: foods[4]._id, name: foods[4].name, price: foods[4].price, quantity: 2, image: foods[4].image },
    ],
    totalPrice: foods[0].price + foods[4].price * 2,
    deliveryAddress: 'DHA Phase 5, Lahore',
    phone: '+92 311 9876543',
    status: 'Delivered',
  });

  console.log('\n✅ Seed complete!');
  console.log('─────────────────────────────────────');
  console.log('Admin:  admin@dadwals.com / admin1234');
  console.log('User:   ahmed@test.com   / test1234');
  console.log(`Foods:  ${foods.length} menu items added`);
  console.log('─────────────────────────────────────');
  process.exit();
};

seed().catch(e => { console.error(e); process.exit(1); });
