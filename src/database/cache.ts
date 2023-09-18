import { createClient } from 'redis';

export const cache = createClient({
    socket: {
        host: 'redis',
        port: 6379,
        tls: false
    }
});