import { RedisConnection } from './main/database/redis.database';
import { DatabaseConnection } from './main/database/typeorm.database';
import { runServer } from './main/server/express.server';

Promise.all([DatabaseConnection.connect(), RedisConnection.connect()]).then(() => {
    runServer();
});
