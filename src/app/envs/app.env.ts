import 'dotenv/config';

export const appEnv = {
    host: process.env.ORM_HOST,
    port: Number(process.env.ORM_PORT!),
    username: process.env.ORM_USER,
    password: process.env.ORM_PASS,
    database: process.env.ORM_NAME
};
