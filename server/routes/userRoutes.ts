import express, { Request, Response, Router } from 'express';
import pool from '../database.ts';

const userRoutes: Router = express.Router();

userRoutes.post('/login', async (req: Request, res: Response) => {
  const { username }: { username: string } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    // checking db for user

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Authentication failed' });
    } else {
      //inserting logged in user to the sessions db
      const loggedInUser = user.rows[0];

      const sessionResult = await pool.query(
        'INSERT INTO sessions (user_id,session_state) VALUES ($1,$2) RETURNING *',
        [loggedInUser.id, 'active']
      );
      // creating cookie to go with session ID
      const newSession = sessionResult.rows[0];
      res.cookie('session_id', newSession.session_id, { httpOnly: true });

      res.json(loggedInUser);
      console.log('user logged in');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Service Error' });
  }
});

userRoutes.post('/signup', async (req: Request, res: Response) => {
  console.log('inside signup');
  const { username, password }: { username: string; password: string } =
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
});

//render dashboard page based on session ID (session persistence)
userRoutes.get('/dashboard', async (req: Request, res: Response) => {
  const sessionId = req.cookies['session_id'];

  if (!sessionId) {
    return res.redirect('/login');
  }

  //we need to check the session id / session state of active
  //if not active/not valid, return to login
  try {
    const session = await pool.query(
      'SELECT * FROM sessions WHERE session_id = $1',
      [sessionId]
    );
    if (
      session.rows.length === 0 ||
      session.rows[0].session_state !== 'active'
    ) {
      return res.redirect('/login');
    }
    //passes conditional? proceed
    const user = await pool.query('SELECT * FROM users WHERE id=$1', [
      session.rows[0].user_id,
    ]);

    res.render('dashboard', { user });
  } catch (error) {
    console.error('Error during dashboard route:', error);
    res.status(500).json({ message: 'Internal Service Error' });
  }

  //else we want to render the dashboard with the user's session
});
export default userRoutes;
