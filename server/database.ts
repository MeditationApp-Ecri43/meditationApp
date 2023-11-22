import pg from 'pg' // 
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pg;


const connectionString = process.env.POSTGRES
const pool = new Pool({connectionString})

pool.connect().then(() => {
  console.log('Database is connected');
}).catch((error) => {
  console.log('Database connection error: ', error)
})

// Use this query to create users table:
// CREATE TABLE IF NOT EXISTS (users 
//  user_id serial PRIMARY KEY,
//  username VARCHAR (50) UNIQUE NOT NULL,
//  password VARCHAR (50) NOT NULL,)

export default pool;

