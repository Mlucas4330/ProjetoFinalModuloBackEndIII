import { RedisConnection } from './main/database/redis.database';
import { runServer } from './main/server/express.server';

Promise.all([RedisConnection.connect()]).then(() => {
    runServer();
});
