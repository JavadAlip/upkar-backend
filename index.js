// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();

// // Routes
// import adminRoutes from './routes/adminRoutes.js';
// import homepageRoutes from './routes/homePage/homepageRouter.js';
// import projectpageRoutes from './routes/projectPage/projectpageRouter.js';
// import aboutusRoutes from './routes/aboutUs/aboutusRouter.js';
// import eventsRoutes from './routes/Events/eventspageRouter.js';
// import careersRoutes from './routes/careersPage/careersRouter.js';
// import completedprojectRoutes from './routes/completedProject/completedprjctpageRouter.js';
// import upcomingprojectRoutes from './routes/upcomingProject/upcomingprjctpageRouter.js';
// import ongoingprojectRoutes from './routes/ongoingProject/ongoingprjctpageRouter.js';
// import blogsRoutes from './routes/BlogPage/blogsRouter.js';
// import projectsRoutes from './routes/projects/projectRoutes.js';
// import categoriesRoutes from './routes/categories/categoriesRouter.js';

// const app = express();
// const PORT = process.env.PORT || 5000;

// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://upkar-frontend.vercel.app',
// ];

// // cors middleware
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         return callback(new Error('CORS not allowed'), false);
//       }
//       return callback(null, true);
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   }),
// );

// app.use(express.json());

// // Routes
// app.use('/api/admin', adminRoutes);
// app.use('/api/homepage', homepageRoutes);
// app.use('/api/projectpage', projectpageRoutes);
// app.use('/api/aboutuspage', aboutusRoutes);
// app.use('/api/eventspage', eventsRoutes);
// app.use('/api/careerspage', careersRoutes);
// app.use('/api/completedproject', completedprojectRoutes);
// app.use('/api/upcomingproject', upcomingprojectRoutes);
// app.use('/api/ongoingproject', ongoingprojectRoutes);
// app.use('/api/blogspage', blogsRoutes);
// app.use('/api/projects', projectsRoutes);
// app.use('/api/categories', categoriesRoutes);

// //Db Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB Connected'))
//   .catch((err) => console.log('MongoDB Connection Error:', err));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Routes
import adminRoutes from './routes/adminRoutes.js';
import homepageRoutes from './routes/homePage/homepageRouter.js';
import projectpageRoutes from './routes/projectPage/projectpageRouter.js';
import aboutusRoutes from './routes/aboutUs/aboutusRouter.js';
import eventsRoutes from './routes/Events/eventspageRouter.js';
import careersRoutes from './routes/careersPage/careersRouter.js';
import completedprojectRoutes from './routes/completedProject/completedprjctpageRouter.js';
import upcomingprojectRoutes from './routes/upcomingProject/upcomingprjctpageRouter.js';
import ongoingprojectRoutes from './routes/ongoingProject/ongoingprjctpageRouter.js';
import blogsRoutes from './routes/BlogPage/blogsRouter.js';
import projectsRoutes from './routes/projects/projectRoutes.js';
import categoriesRoutes from './routes/categories/categoriesRouter.js';
import contactRoutes from './routes/contactPage/contactRouter.js';

// Import the admin creation function
import { createAdminOnce } from './controllers/adminController.js';

const app = express();
const PORT = process.env.PORT || 5000;

/* =========================
   CORS CONFIG (NODE 22 SAFE)
========================= */
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://upkar-frontend.vercel.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   ROUTES
========================= */
app.use('/api/admin', adminRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/projectpage', projectpageRoutes);
app.use('/api/aboutuspage', aboutusRoutes);
app.use('/api/eventspage', eventsRoutes);
app.use('/api/careerspage', careersRoutes);
app.use('/api/completedproject', completedprojectRoutes);
app.use('/api/upcomingproject', upcomingprojectRoutes);
app.use('/api/ongoingproject', ongoingprojectRoutes);
app.use('/api/blogspage', blogsRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/contactpage', contactRoutes);
app.use('/api/categories', categoriesRoutes);

/* =========================
   DB CONNECTION
========================= */
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 30000,
  })
  .then(async () => {
    console.log('MongoDB Connected');
    // Create admin account if it doesn't exist
    await createAdminOnce();
  })
  .catch((err) => console.error('MongoDB Connection Error:', err.message));

/* =========================
   SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
