import { router } from '../lib/router';

import { Post } from '../models/post';
import { Topic } from '../models/topic';
import { Writer } from '../models/writer';

// /home endpoint to get all information that is used in home 
router.get('/home', async (_req, res) => {
    // Getting posts ordered by number of likes
    const posts = await Post.findAll({
        order: [["numOfLike", "DESC"]],
        include: [{
            model: Writer,
            attributes: ['name', 'avatarUrl']
        }]
    });
    
    const topics = await Topic.findAll();

    res.send({
        posts, 
        topics
    });
});

export default router;