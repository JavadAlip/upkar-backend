const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const adminRoutes = require('./routes/adminRoutes');
const bannerRoutes = require('./routes/homePage/bannerRoutes')
app.use('/api/admin', adminRoutes);
app.use('/api/banner', bannerRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.log(' MongoDB Connection Error:', err));

app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
