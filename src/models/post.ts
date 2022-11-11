import { sequelize, types } from "../lib/sequelize";

export interface PostProps {
    id?: number;
    title: string;
    description?: string;
    imageUrl?: string;
    createdAt: string;
    readingTime: number;
    numOfLike: number;
    content: string;
    writerId: number;
    topicId: number
}

export const Post = sequelize.define('post', {
    title: {
        type: types.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: types.STRING
    },
    imageUrl: {
        type: types.STRING
    },
    createdAt: {
        type: types.DATE,
        allowNull: false
    },
    readingTime: {
        type: types.INTEGER,
        allowNull: false
    },
    numOfLike: {
        type: types.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    content: {
        type: types.STRING,
        allowNull: false
    }
}, { timestamps: false }); 

export const postBootstrap = async () => {
    await Post.sync({ force: true });
}

export const postSync = async () => {
    await Post.sync();
}