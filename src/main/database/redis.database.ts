import Redis from 'ioredis';
import { redis_env } from '../../app/envs/redis.env';

export class RedisConnection {
    private static _connection: Redis;
    public static async connect() {
        if (!this._connection) {
            this._connection = new Redis({
                host: redis_env.host,
                port: redis_env.port,
                username: redis_env.username,
                password: redis_env.password
            });
        }

        console.log('Redis is connected.');
    }
    public static get connection() {
        if (!this._connection) {
            throw new Error('Redis is not connected.');
        }

        return this._connection;
    }
}
