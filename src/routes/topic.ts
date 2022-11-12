import { router } from '../lib/router';
import { z } from 'zod';

import { Topic } from '../models/topic'

// /topic endpoint to get all topics
router.get('/topic', async (_req, res) => {
    // Getting all topics
    const topics = await Topic.findAll();
    res.send(topics);
});

// /topic endpoint to create a new topic
router.post('/topic', async (req, res) => {
    // Creating a schema to parse topic data
    const createTopicBody = z.object({
        label: z.string(),
    });

    // Parsing data from JSON body and checking params
    const parse = createTopicBody.safeParse(req.body);
    if(!parse.success) {
        res.status(400).send({ message: "Some parameter is lefting" });
        return;
    }
    
    const { label } = parse.data;

    // Creating a new topic in database
    await Topic.create({
        label
    });

    res.status(201).send({ message: "Topic created" });
});

// /topic endpoint to update a topic
router.put('/topic/:id', async (req, res) => {
    // Creating a schema to parse topic data from url params
    const updateTopicParams = z.object({
        id: z.string()
    });

    // Parsing data from url params
    const { id } = updateTopicParams.parse(req.params);

    // Creating a schema to parse topic data from JSON body
    const updateTopicBody = z.object({
        label: z.string().optional()
    });

    // Parsing data from JSON body
    const { label } = updateTopicBody.parse(req.body);

    // Updating a topic
    await Topic.update({
        label
    }, {
        where: { id }
    });

    res.send({ message: "Topic updated" });
});

// /topic endpoint to delete a topic
router.delete('/topic/:id', async (req, res) => {
    // Creating a schema to parse topic data
    const deleteTopicParams = z.object({
        id: z.string()
    });

    // Parsing data from url params
    const { id } = deleteTopicParams.parse(req.params);

    // Finding and deleting a topic
    await Topic.destroy({ where: { id }});

    res.send({ message: "Topic deleted" });
});

export default router;