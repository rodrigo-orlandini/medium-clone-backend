import { router } from '../lib/router';

import { Post } from '../models/post';
import { Topic } from '../models/topic';

router.get('/home', async (_req, res) => {
    const posts = await Post.findAll({
        order: [["numOfLike", "DESC"]]
    });
    
    const topics = await Topic.findAll();

    res.send({
        posts, 
        topics
    });
});

export default router;