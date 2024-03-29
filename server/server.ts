import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoute';

dotenv.config();

const app: express.Express = express();
const mongoURI = process.env.MONGODB_URI as string;
const port = process.env.PORT;

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch((err) => {
    console.log(err);
  });


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/api/auth', authRoutes);


app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
