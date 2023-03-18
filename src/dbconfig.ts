import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
const dbConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'ec2-3-217-219-146.compute-1.amazonaws.com',
  port: 5432,
  username: 'txedtbglhtoapb',
  password: process.env['DB_PASSWORD'],
  database: 'd44kf927d8uf9c',
  synchronize: true,
  logging: false,
  entities: ['./dist/models/*.js'],
  ssl: {
    rejectUnauthorized: false
  }
};
export default dbConfig;