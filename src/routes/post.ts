import { router } from '../lib/router';
import { z } from 'zod';

import { Post } from '../models/post';
import { Topic } from '../models/topic';
import { Writer } from '../models/writer';

// /posts endpoint to get all posts
router.get('/post', async (_req, res) => {
    // Getting posts including attributes from Topics and Writers
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

// /post endpoint to create a new post
router.post('/post', async (req, res) => {
    // Creating a schema to parse post data
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

    // Parsing data from JSON body and checking params
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

    // Creating a new post in database
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

// /post endpoint to update a post
router.put('/post/:id', async (req, res) => {
    // Creating a schema to parse post data from url params
    const updatePostParams = z.object({
        id: z.string()
    });

    // Parsing data from url params
    const { id } = updatePostParams.parse(req.params);

    // Creating a schema to parse post data from JSON body
    const updatePostBody = z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        readingTime: z.number().optional(),
        numOfLike: z.number().optional(),
        content: z.number().optional(),
        topicId: z.number().optional(),
    });

    // Parsing data from JSON body
    const { 
        title, 
        description,
        imageUrl,
        readingTime,
        numOfLike,
        content,
        topicId
    } = updatePostBody.parse(req.body);

    // Updating a post
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

// /post endpoint to delete a post
router.delete('/post/:id', async (req, res) => {
    // Creating a schema to parse post data
    const deletePostParams = z.object({
        id: z.string()
    });

    // Parsing data from url params
    const { id } = deletePostParams.parse(req.params);

    // Finding and deleting a post
    await Post.destroy({ where: { id }});

    res.send({ message: "Post deleted" });
});

export default router;