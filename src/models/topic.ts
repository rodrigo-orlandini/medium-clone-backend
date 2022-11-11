import { sequelize, types } from "../lib/sequelize";

import { Post } from "./post";

export interface TopicProps {
    id?: number;
    label: string;
}

export const Topic = sequelize.define('topic', {
    label: {
        type: types.STRING,
        allowNull: false,
        unique: true
    }
}, { timestamps: false });

Topic.hasMany(Post);
Post.belongsTo(Topic);

export const topicBootstrap = async () => {
    await Topic.sync({ force: true });
}

export const topicSync = async () => {
    await Topic.sync();
}