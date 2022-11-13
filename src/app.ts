import express from 'express';
import cors from 'cors';

import writerRouter from './routes/writer'
import postRouter from './routes/post'
import topicRouter from './routes/topic'
import frontendRouter from './routes/frontend'

// Setting port that server will run
export const port = process.env.PORT || 3333;

// Setting up Express application
const app = express();

// Setting up middlewares to get JSON data from requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setting up cors to access application in restricted urls 
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://hoppscotch.io"
    ]
}));

// Bringing routes to add to application
app.use(writerRouter);
app.use(postRouter);
app.use(topicRouter);
app.use(frontendRouter);

export default app;