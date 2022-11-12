import { sequelize, types } from "../lib/sequelize";

import { Post } from "./post";

export interface WriterProps {
    id?: number;
    name: string;
    avatarUrl?: string;
}

// Creating writer model
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

// Creating Topic - Post relationship 
Writer.hasMany(Post);
Post.belongsTo(Writer);

// Writer table creation
export const writerBootstrap = async () => {
    await Writer.sync({ force: true });
}

// Writer table creation
export const writerSync = async () => {
    await Writer.sync();
}