import request from 'supertest';

import app from '../app';
import { getInstanceId, TestSuiteTemplate } from '../helper/testing';

describe('Writer', () => {

    const data = {
        name: String(Math.round(Math.random() * 9999)),
        avatarUrl: "https://github.com/rodrigo-orlandini.png",
        password: "1234"
    }
    const newName = String(Math.round(Math.random() * 9999));

    it('GET /writer', async () => {
        await TestSuiteTemplate.get200({
            route: '/writer'
        });
    });

    it('POST /signup 201', async () => {
        await TestSuiteTemplate.post201({
            route: '/signup', 
            data: data, 
            message: "Writer created"
        });
    });

    it('POST /signup 400', async () => {
        await TestSuiteTemplate.post400({
            route: '/signup'
        });
    });

    it('POST /signin 200', async () => {
        await TestSuiteTemplate.post200({
            route: '/signin', 
            data: data
        });
    });

    it('POST /signin 400', async () => {
        await TestSuiteTemplate.post400({
            route: '/signin'
        });
    });

    it('POST /signin 404', async () => {
        await TestSuiteTemplate.post404({
            route: '/signin'
        });
    });

    it('PUT /writer', async () => {
        const response = await request(app).post("/signin").send(data)
            .expect(200);

        const id = response.body.jwt;
        
        await TestSuiteTemplate.put({
            route: '/writer',
            item: { id, body: { name: newName }},
            message: "Writer updated"
        });
    });

    it('DELETE /writer', async () => {
        const response = await request(app).post("/signin").send({ ...data, name: newName })
            .expect(200);

        const id = response.body.jwt;

        await TestSuiteTemplate.delete({
            route: '/writer',
            id: id,
            message: "Writer deleted"
        });
    });
});