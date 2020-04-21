import mysql from 'mysql2/promise';
import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD } from './secrets';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: MYSQL_HOST,
    port: MYSQL_PORT,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: 'omg',
    waitForConnections: true,
    connectionLimit: 10
})

export default pool;