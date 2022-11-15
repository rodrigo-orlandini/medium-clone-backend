import { getInstanceId, TestSuiteTemplate } from '../helper/testing';

describe('Post', () => {

    const data = {
        title: String(Math.round(Math.random() * 9999)),
        description: "Some description...",
        imageUrl: "https://th.bing.com/th/id/OIP.qBokozZV0hRf1unYL8x7iQHaE7?pid=ImgDet&rs=1",
        readingTime: 10,
        numOfLike: 60,
        content: "",
        topicId: 14,
        writerId: 1
    }
    const newTitle = String(Math.round(Math.random() * 9999));

    it('GET /post', async () => {
        await TestSuiteTemplate.get200({
            route: '/post'
        });
    });

    it('POST /post', async () => {
        await TestSuiteTemplate.post201({
            route: '/post', 
            data: { ...data, createdAt: String(new Date()) }, 
            message: "Post created"
        });
    });

    it('POST /post 400', async () => {
        await TestSuiteTemplate.post400({
            route: '/post'
        });
    });

    it('PUT /post/:id', async () => {
        const id = await getInstanceId("post", data.title);
        
        await TestSuiteTemplate.put({
            route: '/post',
            item: { id, body: { title: newTitle }},
            message: "Post updated"
        });
    });

    it('DELETE /post/:id', async () => {
        const id = await getInstanceId("post", newTitle);

        await TestSuiteTemplate.delete({
            route: '/post',
            id: id,
            message: "Post deleted"
        });
    });
});