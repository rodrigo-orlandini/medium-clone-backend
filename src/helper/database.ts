import { postBootstrap, postSync } from '../models/post';
import { writerBootstrap, writerSync } from '../models/writer';
import { topicBootstrap, topicSync } from '../models/topic';

// Initialize database
export const bootstrap = async () => {
    await writerBootstrap();
    await topicBootstrap();
    await postBootstrap();
}

// Sync database
export const syncStorage = async () => {
    await writerSync();
    await topicSync();
    await postSync();
}