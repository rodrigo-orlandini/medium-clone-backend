import express from 'express';
import cors from 'cors';

import writerRouter from './routes/writer'
import postRouter from './routes/post'
import topicRouter from './routes/topic'
import frontendRouter from './routes/frontend'

export const port = process.env.PORT || 3333;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3333', `http://localhost:${port}`]
}));

app.use(writerRouter);
app.use(postRouter);
app.use(topicRouter);
app.use(frontendRouter);

export default app;