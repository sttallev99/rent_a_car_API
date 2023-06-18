import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoute.js';
import carsRouter from './routes/carsRoute.js';
import userRouter from './routes/userRoute.js';
import rentRouter from './routes/rentRoute.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/seed/', seedRouter);
app.use('/api/cars/', carsRouter);
app.use('/api/users/', userRouter);
app.use('/api/rent/', rentRouter);

dotenv.config();
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('Connect to DB');
}).catch((error) => {
    console.log(error.message)
}); 

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server at: http://localhost:${port}`)
})