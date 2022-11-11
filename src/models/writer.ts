import { sequelize, types } from "../lib/sequelize";

import { Post } from "./post";

export interface WriterProps {
    id?: number;
    name: string;
    avatarUrl?: string;
}

export const Writer = sequelize.define('writer', {
    name: {
        type: types.STRING,
        allowNull: false,
        unique: true
    },
    avatarUrl: {
        type: types.STRING
    }
}, { timestamps: false });

Writer.hasMany(Post);
Post.belongsTo(Writer);

export const writerBootstrap = async () => {
    await Writer.sync({ force: true });
}

export const writerSync = async () => {
    await Writer.sync();
}