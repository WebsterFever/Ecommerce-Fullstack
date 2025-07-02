const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

// Import route files
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes'); // ✅ NEW
const cartItemRoutes = require('./routes/cartItem.routes'); // ✅ NEW

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes); // ✅ For managing carts
app.use('/api/cart-items', cartItemRoutes); // ✅ For managing cart items

// Start server and connect to DB
const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => {
    console.log('📦 Database connected!');
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to DB:', err);
  });
