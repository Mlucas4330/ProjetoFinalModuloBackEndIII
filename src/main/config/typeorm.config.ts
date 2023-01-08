import { DataSource } from 'typeorm';
import 'dotenv/config';
import { appEnv } from '../../app/envs/app.env';

export default new DataSource({
    type: 'postgres',
    host: appEnv.host,
    port: appEnv.port,
    username: appEnv.username,
    password: appEnv.password,
    database: appEnv.database,
    ssl: {
        rejectUnauthorized: false
    },
    synchronize: false,
    entities: ['src/app/shared/entities/**/*.ts'],
    migrations: ['src/app/shared/migrations/**/*.ts']
});
