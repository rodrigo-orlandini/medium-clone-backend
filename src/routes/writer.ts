import { router } from '../lib/router';
import { z } from 'zod';

import { Writer } from '../models/writer'

import { authenticate } from '../helper/authentication';

// /writer endpoint to get all writers
router.get('/writer', async (_req, res) => {
    // Getting all writers
    const writers = await Writer.findAll();
    res.send(writers);
});

// /writer endpoint to update a writer
router.put('/writer', async (req, res) => {
    // Getting 'Authorization: Bearer ...' (jwt token)
    const token = req.headers.authorization?.split(' ')[1];
    const auth = authenticate({ token });

    // Checking token
    if(auth.status !== 200) {
        return res.status(auth.status).send({ message: auth.data.message });
    }

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
        where: { id: auth.data.id }
    });

    res.send({ message: "Writer updated" });
});

// /writer endpoint to delete a writer
router.delete('/writer', async (req, res) => {
    // Getting 'Authorization: Bearer ...' (jwt token)
    const token = req.headers.authorization?.split(' ')[1];
    const auth = authenticate({ token });

    // Checking token
    if(auth.status !== 200) {
        return res.status(auth.status).send({ message: auth.data.message });
    }

    // Finding and deleting a writer
    await Writer.destroy({ 
        where: { 
            id: auth.data.id
        }
    });

    res.send({ message: "Writer deleted" });
});

export default router;