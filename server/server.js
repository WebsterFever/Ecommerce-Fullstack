const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes'); 
const productRoutes = require('./routes/product.routes');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/admin', adminRoutes); 
app.use('/products', productRoutes);
// Start server and connect to DB
const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => {
    console.log('📦 Database connected!');
    return sequelize.sync({ alter: true }); // Keep data
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Unable to connect to DB:', err);
  });
