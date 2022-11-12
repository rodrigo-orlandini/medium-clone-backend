import { router } from '../lib/router';
import { z } from 'zod';

import { Writer } from '../models/writer'

// /writer endpoint to get all writers
router.get('/writer', async (_req, res) => {
    // Getting all writers
    const writers = await Writer.findAll();
    res.send(writers);
});

// /writer endpoint to create a new writer
router.post('/writer', async (req, res) => {
    // Creating a schema to parse writer data
    const createWriterBody = z.object({
        name: z.string(),
        avatarUrl: z.string().optional()
    });

    // Parsing data from JSON body and checking params
    const parse = createWriterBody.safeParse(req.body);
    if(!parse.success) {
        res.status(400).send({ message: "Some parameter is lefting" });
        return;
    }

    const { name, avatarUrl } = parse.data;

    // Creating a new writer in database
    await Writer.create({
        name,
        avatarUrl
    });

    res.status(201).send({ message: "Writer created" });
});

// /writer endpoint to update a writer
router.put('/writer/:id', async (req, res) => {
    // Creating a schema to parse writer data from url params
    const updateWriterParams = z.object({
        id: z.string()
    });

    // Parsing data from url params
    const { id } = updateWriterParams.parse(req.params);

    // Creating a schema to parse writer data from JSON body
    const updateWriterBody = z.object({
        name: z.string().optional(),
        avatarUrl: z.string().optional()
    });

    // Parsing data from JSON body
    const { name, avatarUrl } = updateWriterBody.parse(req.body);

    // Updating a writer
    await Writer.update({
        name, 
        avatarUrl
    }, {
        where: { id }
    });

    res.send({ message: "Writer updated" });
});

// /writer endpoint to delete a writer
router.delete('/writer/:id', async (req, res) => {
    // Creating a schema to parse writer data
    const deleteWriterParams = z.object({
        id: z.string()
    });

    // Parsing data from url params
    const { id } = deleteWriterParams.parse(req.params);

    // Finding and deleting a writer
    await Writer.destroy({ where: { id }});

    res.send({ message: "Writer deleted" });
});

export default router;