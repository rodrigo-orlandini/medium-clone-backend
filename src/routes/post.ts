import { router } from '../lib/router';
import { z } from 'zod';

import { Post } from '../models/post';
import { Topic } from '../models/topic';
import { Writer } from '../models/writer';

router.get('/post', async (_req, res) => {
    const posts = await Post.findAll({ 
    attributes: {
        exclude: ['topicId', 'writerId']
    },
    include: [{
        model: Topic,
        attributes: ['label']
    }, {
        model: Writer,
        attributes: ['name', 'avatarUrl']
    }]});
    res.send(posts);
});

router.post('/post', async (req, res) => {
    const createPostBody = z.object({
        title: z.string(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        readingTime: z.number(),
        numOfLike: z.number(),
        content: z.string(),
        writerId: z.number(),
        topicId: z.number()
    });

    const parse = createPostBody.safeParse(req.body);
    if(!parse.success) {
        res.status(400).send({ message: "Some parameter is lefting" });
        return;
    }

    const { 
        title, 
        description,
        imageUrl,
        readingTime,
        numOfLike,
        content,
        writerId,
        topicId
    } = parse.data;
    const createdAt = new Date();

    await Post.create({
        title, 
        description,
        imageUrl,
        createdAt,
        readingTime,
        numOfLike,
        content,
        writerId,
        topicId
    });

    res.status(201).send({ message: "Post created" });
});

router.put('/post/:id', async (req, res) => {
    const updatePostParams = z.object({
        id: z.string()
    });

    const { id } = updatePostParams.parse(req.params);

    const updatePostBody = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        readingTime: z.number().optional(),
        numOfLike: z.number().optional(),
        content: z.number().optional(),
        topicId: z.number().optional(),
    });

    const { 
        title, 
        description,
        imageUrl,
        readingTime,
        numOfLike,
        content,
        topicId
    } = updatePostBody.parse(req.body);

    await Post.update({
        title, 
        description,
        imageUrl,
        readingTime,
        numOfLike,
        content,
        topicId
    }, {
        where: { id }
    });

    res.send({ message: "Post updated" });
});

router.delete('/post/:id', async (req, res) => {
    const deletePostParams = z.object({
        id: z.string()
    });

    const { id } = deletePostParams.parse(req.params);

    await Post.destroy({ where: { id }});

    res.send({ message: "Post deleted" });
});

export default router;