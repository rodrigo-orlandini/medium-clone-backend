import { getInstanceId, TestSuiteTemplate } from '../helper/testing';

describe('Writer', () => {

    const data = {
        name: String(Math.round(Math.random() * 9999)),
        avatarUrl: "https://github.com/rodrigo-orlandini.png"
    }
    const newName = String(Math.round(Math.random() * 9999));

    it('GET /writer', async () => {
        await TestSuiteTemplate.get200({
            route: '/writer'
        });
    });

    it('POST /writer', async () => {
        await TestSuiteTemplate.post201({
            route: '/writer', 
            data: data, 
            message: "Writer created"
        });
    });

    it('POST /post 400', async () => {
        await TestSuiteTemplate.post400({
            route: '/writer'
        });
    });

    it('PUT /writer/:id', async () => {
        const id = await getInstanceId("writer", data.name);
        
        await TestSuiteTemplate.put({
            route: '/writer',
            item: { id, body: { name: newName }},
            message: "Writer updated"
        });
    });

    it('DELETE /writer/:id', async () => {
        const id = await getInstanceId("writer", newName);

        await TestSuiteTemplate.delete({
            route: '/writer',
            id: id,
            message: "Writer deleted"
        });
    });
});