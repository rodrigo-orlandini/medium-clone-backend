import { sequelize, types } from "../lib/sequelize";

import { Post } from "./post";

export interface TopicProps {
    id?: number;
    label: string;
}

// Creating topic model
export const Topic = sequelize.define('topic', {
    label: {
        type: types.STRING,
        allowNull: false,
        unique: true
    }
}, { timestamps: false });

// Creating Topic - Post relationship
Topic.hasMany(Post);
Post.belongsTo(Topic);

// Topic table creation
export const topicBootstrap = async () => {
    await Topic.sync({ force: true });
}

// Topic table syncing
export const topicSync = async () => {
    await Topic.sync();
}