import { router } from '../lib/router';
import { z } from 'zod';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { Writer } from '../models/writer';

import { authenticate } from '../helper/authentication';

// /signup endpoint to register a new writer
router.post('/signup', async (req, res) => {
    // Creating a schema to parse writer data
    const createWriterBody = z.object({
        name: z.string(),
        password: z.string(),
        avatarUrl: z.string().optional()
    });

    // Parsing data from JSON body and checking params
    const parse = createWriterBody.safeParse(req.body);
    if(!parse.success) {
        res.status(400).send({ message: "Some parameter is lefting" });
        return;
    }

    const { name, password, avatarUrl } = parse.data;

    // Checking if writer name already exists
    const writer = await Writer.findOne({
        where: {
            name
        }
    });

    if(writer) {
        res.status(400).send({ message: "Writer already exists" });
        return;
    }

    // Hashing password
    const hash = bcrypt.hashSync(password, Math.round(Math.random() * Number(process.env.SALT_ROUND)));

    // Creating a new writer in database
    await Writer.create({
        name,
        password: hash,
        avatarUrl
    });

    res.status(201).send({ message: "Writer created" });
});

// /signin endpoint to login writer
router.post("/signin", async (req, res) => {
    // Creating a schema to parse writer data
    const createWriterBody = z.object({
        name: z.string(),
        password: z.string()
    });

    // Parsing data from JSON body and checking params
    const parse = createWriterBody.safeParse(req.body);
    if(!parse.success) {
        res.status(400).send({ message: "Some parameter is lefting" });
        return;
    }

    const { name, password } = parse.data;

    // Checking if writer exists
    const data = await Writer.findOne({
        where: {
            name
        }
    });

    if(!data) {
        res.status(404).send({ message: "Writer not found" });
        return;
    }

    const writer = data.toJSON();

    // Checking password
    if(bcrypt.compareSync(password, writer.password)) {
        // Creating a JWT to authenticate writer
        const token = jwt.sign({
            id: writer.id,
            name: writer.name,
            avatarUrl: writer.avatarUrl
        }, process.env.JWT_SECRET || "secret", {
            expiresIn: '1h'         // It should be a less time and implements a way to refresh token
        });

        res.status(200).send({ jwt: token });
        return;
    } else {
        res.status(400).send({ message: "Incorrect password" });
    }
});

// /me endpoint to get writer data
router.get("/me", (req, res) => {
    // Getting 'Authorization: Bearer ...' (jwt token)
    const token = req.headers.authorization?.split(' ')[1];
    const auth = authenticate({ token });

    // Checking token
    if(auth.status !== 200) {
        return res.status(auth.status).send({ message: auth.data.message });
    }

    return res.status(200).send({ ...auth.data });
});

export default router;