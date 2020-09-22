import Twitter from "twitter";
// import { ConnectedRedis } from "..";
import ExpressRedisCache from "express-redis-cache/lib/ExpressRedisCache";

export interface IInjectables {
    // redis: ConnectedRedis;
    twitter: Twitter;
    cache: ExpressRedisCache;
}
