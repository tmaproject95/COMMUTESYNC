import mysql2 from 'mysql2'
const PORT = 5000;

const pool=mysql2.createPool({
    host: 'localhost',
    user: 'root',
    password: 'commutesync',
    database: 'CommuteSync',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0

});
const promisePool = pool.promise();
console.log('CommuteSync CONNECTION Established...');

export const db = promisePool;
export const APP_PORT = PORT;
export const pool=pool;

