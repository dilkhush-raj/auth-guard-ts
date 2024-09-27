import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookiePraser from 'cookie-parser';

const app = express();

// App Setup
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })
);

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true, limit: '16kb'}));
app.use(express.json({limit: '16kb'}));
app.use(express.static('public'));
app.use(cookiePraser());

// Routes imports
import verifyRoute from './routes/verify.routes';

// Routes setup
app.use('/api/v1/verify', verifyRoute);
app.get('/ping', (req, res) => {
  res.send({message: 'pong'});
});

export {app};
