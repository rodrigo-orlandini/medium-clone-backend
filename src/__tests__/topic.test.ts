import { getInstanceId, TestSuiteTemplate } from '../helper/testing';

describe('Topic', () => {

    const label = String(Math.round(Math.random() * 9999));
    const newLabel = String(Math.round(Math.random() * 9999));

    it('GET /topic', async () => {
        await TestSuiteTemplate.get200({
            route: '/topic'
        });
    });

    it('POST /topic', async () => {
        await TestSuiteTemplate.post201({
            route: '/topic', 
            data: { label }, 
            message: "Topic created"
        });
    });

    it('POST /post 400', async () => {
        await TestSuiteTemplate.post400({
            route: '/topic'
        });
    });

    it('PUT /topic/:id', async () => {
        const id = await getInstanceId("topic", label);
        
        await TestSuiteTemplate.put({
            route: '/topic',
            item: { id, body: { label: newLabel }},
            message: "Topic updated"
        });
    });

    it('DELETE /topic/:id', async () => {
        const id = await getInstanceId("topic", newLabel);

        await TestSuiteTemplate.delete({
            route: '/topic',
            id: id,
            message: "Topic deleted"
        });
    });
});