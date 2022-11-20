import express, { urlencoded } from 'express';
import { PORT } from './config';
import { errorHandler } from './middlewares';
import { connectToDatabase } from './services';
import routs from './routes';
import path from 'path';
import cors from 'cors';

const port = PORT || 3000;

const app = express();

connectToDatabase();

global.appRoot = path.resolve(__dirname);

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/api', routs);
app.use(errorHandler);

app.listen(port, () =>
    console.log(`server started on http://127.0.0.1:${port}`)
);
