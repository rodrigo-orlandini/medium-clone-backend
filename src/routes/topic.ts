import { router } from '../lib/router';
import { z } from 'zod';

import { Topic } from '../models/topic'

router.get('/topic', async (_req, res) => {
    const topics = await Topic.findAll();
    res.send(topics);
});

router.post('/topic', async (req, res) => {
    const createTopicBody = z.object({
        label: z.string(),
    });

    const parse = createTopicBody.safeParse(req.body);
    if(!parse.success) {
        res.status(400).send({ message: "Some parameter is lefting" });
        return;
    }
    
    const { label } = parse.data;

    await Topic.create({
        label
    });

    res.status(201).send({ message: "Topic created" });
});

router.put('/topic/:id', async (req, res) => {
    const updateTopicParams = z.object({
        id: z.string()
    });

    const { id } = updateTopicParams.parse(req.params);

    const updateTopicBody = z.object({
        label: z.string().optional()
    });

    const { label } = updateTopicBody.parse(req.body);

    await Topic.update({
        label
    }, {
        where: { id }
    });

    res.send({ message: "Topic updated" });
});

router.delete('/topic/:id', async (req, res) => {
    const deleteTopicParams = z.object({
        id: z.string()
    });

    const { id } = deleteTopicParams.parse(req.params);

    await Topic.destroy({ where: { id }});

    res.send({ message: "Topic deleted" });
});

export default router;