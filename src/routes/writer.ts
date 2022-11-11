import { router } from '../lib/router';
import { z } from 'zod';

import { Writer } from '../models/writer'

router.get('/writer', async (_req, res) => {
    const writers = await Writer.findAll();
    res.send(writers);
});

router.post('/writer', async (req, res) => {
    const createWriterBody = z.object({
        name: z.string(),
        avatarUrl: z.string().optional()
    });

    const parse = createWriterBody.safeParse(req.body);
    if(!parse.success) {
        res.status(400).send({ message: "Some parameter is lefting" });
        return;
    }

    const { name, avatarUrl } = parse.data;

    await Writer.create({
        name,
        avatarUrl
    });

    res.status(201).send({ message: "Writer created" });
});

router.put('/writer/:id', async (req, res) => {
    const updateWriterParams = z.object({
        id: z.string()
    });

    const { id } = updateWriterParams.parse(req.params);

    const updateWriterBody = z.object({
        name: z.string().optional(),
        avatarUrl: z.string().optional()
    });

    const { name, avatarUrl } = updateWriterBody.parse(req.body);

    await Writer.update({
        name, 
        avatarUrl
    }, {
        where: { id }
    });

    res.send({ message: "Writer updated" });
});

router.delete('/writer/:id', async (req, res) => {
    const deleteWriterParams = z.object({
        id: z.string()
    });

    const { id } = deleteWriterParams.parse(req.params);

    await Writer.destroy({ where: { id }});

    res.send({ message: "Writer deleted" });
});

export default router;