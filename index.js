// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();

// // Routes
// import adminRoutes from './routes/adminRoutes.js';
// import homepageRoutes from './routes/homePage/homepageRouter.js';

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// app.use('/api/admin', adminRoutes);
// app.use('/api/homepage', homepageRoutes);


// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log('MongoDB Connection Error:', err));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();

// import adminRoutes from './routes/adminRoutes.js';
// import homepageRoutes from './routes/homePage/homepageRouter.js';
// import projectpageRoutes from './routes/projectPage/projectpageRouter.js';

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/admin', adminRoutes);
// app.use('/api/homepage', homepageRoutes);
// app.use('/api/projectpage', projectpageRoutes);

// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log(' DB Connected'))
// .catch(err => console.log(' DB Connection Error:', err));

// const PORT = process.env.PORT || 10000;
// app.listen(PORT, () => console.log(` Server running on port ${PORT}`));







import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Routes
import adminRoutes from './routes/adminRoutes.js';
import homepageRoutes from './routes/homePage/homepageRouter.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed origins: local dev + Vercel production
const allowedOrigins = [
  'http://localhost:5173', // local dev
  'https://upkar-frontend.vercel.app' // production
];

// CORS middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // allow Postman or server-to-server requests
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('CORS not allowed'), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/homepage', homepageRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
