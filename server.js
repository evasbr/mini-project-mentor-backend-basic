import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import {Router} from './routes/post-route.js';
import 'dotenv/config';

const connectDB = async() => {
    const url = process.env.MONGODB_URL;
    try {
        await mongoose.connect(url, {
        });
    } catch (error) {
        console.error(err.message);
        process.exit(1);
    }
}

const app = express();

app.use(bodyParser.json());

app.use(Router);

const PORT = 3000;

connectDB()
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Server berjalan di http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.log("Gagal menghubungkan ke database: ", err);
    })

