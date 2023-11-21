import express, { Request, Response, Router } from 'express';
import pool from '../database.ts';

const userRoutes: Router = express.Router();

userRoutes.post(
  '/login',
  async (req: Request, res: Response) => {
    const { username}: { username: string} =
      req.body;

    try {
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [
        username,
      ]);
      // checking db for user

      if (user.rows.length === 0) {
        return res.status(401).json({ message: 'Authentication failed' });
      } else {
        res.json(user.rows[0]);
        res.send('User logged in');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal Service Error' });
    }
  }
);

userRoutes.post(
  '/signup',
  async (req: Request, res: Response) => {
    console.log('inside signup');
    const { username, password }: { username: string, password: string } =
      req.body;

    try {
      const user = await pool.query(
        'INSERT INTO users (username, password) VALUES ($1, $2)',
        [username, password]
      );

      return res.json(user.rows[0]);
    } catch (error) {
      console.error('Error during signup: ', error);
      res.status(500).json({ message: 'Internal Service Error' });
    }
  }
);

export default userRoutes;
