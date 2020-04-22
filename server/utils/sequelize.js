import Sequelize from 'sequelize';
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD } from './secrets';

const sequelize = new Sequelize(
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    {
        host: MYSQL_HOST,
        port: MYSQL_PORT,
        dialect: 'mysql',
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000
        }
    }
)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;