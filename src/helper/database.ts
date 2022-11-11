import { postBootstrap, postSync } from '../models/post';
import { writerBootstrap, writerSync } from '../models/writer';
import { topicBootstrap, topicSync } from '../models/topic';

export const bootstrap = async () => {
    await writerBootstrap();
    await topicBootstrap();
    await postBootstrap();
}

export const syncStorage = async () => {
    await writerSync();
    await topicSync();
    await postSync();
}