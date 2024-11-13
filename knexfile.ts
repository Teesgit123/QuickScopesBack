require('dotenv').config();

const { DB_LOCAL_IP, DB_LOCAL_DBNAME, DB_LOCAL_USER, DB_LOCAL_PASSWORD } = process.env;


module.exports = {
  client: "mysql2",
  connection: {
    host: DB_LOCAL_IP,
    database: DB_LOCAL_DBNAME,
    user: DB_LOCAL_USER,
    password: DB_LOCAL_PASSWORD,
  },
  migrations: {
    directory: './src/migrations', 
    extension: 'ts',
  },
  seeds: {
    directory: './src/seeds',
    extension: 'ts',
  }
}

