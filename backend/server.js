import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Database Connected successfully");
}).catch(err => {
    console.log(err);
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);


//errorhandler for express
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
});










const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`sever is running at port no. ${PORT}`);
})
