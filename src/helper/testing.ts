import request from "supertest";

import app from '../app';

import { WriterProps } from "../models/writer";
import { PostProps } from "../models/post";
import { TopicProps } from "../models/topic";

// Finding a register by writer name, post title or topic label
export const getInstanceId = async (instance: 'writer' | 'post' | 'topic', search: string) => {
    const { body } = await request(app).get(`/${instance}`);
    
    if(instance === "writer") {
        return body.filter((writer: WriterProps) => writer.name === search)[0].id;
    } else if(instance === "post") {
        return body.filter((post: PostProps) => post.title === search)[0].id;
    } else {
        return body.filter((topic: TopicProps) => topic.label === search)[0].id;
    }
}


interface GetProps {
    route: '/writer' | '/post' | '/topic' | '/home';
}
interface Post200Props {
    route: '/signin';
    data: WriterProps;
}
interface Post201Props {
    route: '/writer' | '/post' | '/topic' | '/signup';
    data: WriterProps | PostProps | TopicProps;
    message: 'Writer created' | 'Post created' | 'Topic created';
}
interface Post400Props {
    route: '/writer' | '/post' | '/topic' | '/signup' | '/signin';
}
interface Post404Props {
    route: '/signin';
}
interface PutProps {
    route: '/writer' | '/post' | '/topic';
    item: {
        id: number;
        body: object;
    };
    message: 'Writer updated' | 'Post updated' | 'Topic updated';
}
interface DeleteProps {
    route: '/writer' | '/post' | '/topic';
    id: number;
    message: 'Writer deleted' | 'Post deleted' | 'Topic deleted';
}

// Templates to execute HTTP requests during tests
export const TestSuiteTemplate = {
    get200: async ({ route }: GetProps) => {
        await request(app).get(route)
            .expect(200);
    },
    post200: async ({ route, data }: Post200Props) => {
        const response = await request(app).post(route).send({ ...data })
            .expect(200);
    },
    post201: async ({ route, data, message }: Post201Props) => {
        const response = await request(app).post(route).send({ ...data })
            .expect(201);

        expect(response.body).toEqual(
            expect.objectContaining({
                message
            })
        );
    },
    post400: async ({ route }: Post400Props) => {
        const response = await request(app).post(route).send({  })
            .expect(400);

        expect(response.body).toEqual(
            expect.objectContaining({
                message: "Some parameter is lefting" || "Writer already exists" || "Incorrect password"
            })
        );
    },
    post404: async ({ route }: Post404Props) => {
        const response = await request(app).post(route).send({ 
            name: "nameNeverUsedBefore123456789", 
            password: "any"
        }).expect(404);

        expect(response.body).toEqual(
            expect.objectContaining({
                message: "Writer not found"
            })
        );
    },
    put: async ({ route, item, message }: PutProps) => {
        if(route === "/writer") {
            var response = await request(app).put(`${route}`).send(item.body).set("Authorization", `Bearer ${item.id}`)
                .expect(200);
        } else {
            var response = await request(app).put(`${route}/${item.id}`).send(item.body)
                .expect(200);
        }

        expect(response.body).toEqual(
            expect.objectContaining({
                message
            })
        );
    },
    delete: async ({ route, id, message }: DeleteProps) => {
        if(route === "/writer") {
            var response = await request(app).delete(`${route}`).set("Authorization", `Bearer ${id}`)
                .expect(200);
        } else {
            var response = await request(app).delete(`${route}/${id}`)
                .expect(200);
        }

        expect(response.body).toEqual(
            expect.objectContaining({
                message
            })
        );
    }
}