import express from 'express';
import cors  from 'cors';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import restaurant from './routes/restaurant.js'


const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/restaurants', restaurant);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
