import express from 'express';
import bodyParser from 'body-parser';
import {Router} from './routes/post-route.js'

const app = express();

app.use(bodyParser.json());

app.use(Router);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});