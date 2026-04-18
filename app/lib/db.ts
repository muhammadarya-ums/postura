import mysql from 'mysql2/promise';

export const connection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_postura'
  });
};