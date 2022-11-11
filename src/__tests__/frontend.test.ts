import request from "supertest";

import app from '../app';

describe('Home', () => {
    it('GET /home', async () => {
        await request(app).get('/home')
            .expect(200);
    });
});