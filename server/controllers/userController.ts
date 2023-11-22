import { NextFunction, Request, Response } from 'express';
import pool from '../database.ts';
import bcrypt from 'bcryptjs';

const userController = {
  registerUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username, password } = req.body;

    // Validate input fields
    if (!username || !password) {
      return next({
        log: 'Error in userController.createUser: Missing input fields',
        status: 400,
        message: { err: 'All fields required' },
      });
    }
    try {
      // Checks database for matching existing username
      const existingUserQuery = 'SELECT * FROM "users" WHERE username = $1';
      const existingUserValues = [username];
      const existingUserResult = await pool.query(
        existingUserQuery,
        existingUserValues
      );

      // Send error response for existing username
      if (existingUserResult.rows.length > 0) {
        return next({
          log: 'Error in userController.registerUser: User already exists',
          status: 409,
          message: { error: 'Username already exists' },
        });
      }

      // Encrypt yser password and insert new user into database
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const insertQuery = `INSERT INTO "users" (username, password) VALUES ($1, $2) RETURNING *`;
      const insertValues = [username, hashedPassword];
      const createUser = await pool.query(insertQuery, insertValues);

      // Store username and user ID in res.locals for further middleware functionality
      res.locals.user_id = createUser.rows[0].user_id;
      res.locals.username = req.body.username;
      return next();
    } catch (error) {
      return next({
        log: `error in userController.createUser: ${error}`,
        status: 500,
        message: { error: 'Unable to create user' },
      });
    }
  },

  loginUser: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { username, password } = req.body;

    // Validate input fields
    if (!username || !password) {
      return next({
        log: 'Error in userController.loginUser: Missing input fields',
        status: 400,
        message: { err: 'All fields required' },
      });
    }

    try {
      // Query to retrieve the user based on provided username
      const existingUsernameQuery = `SELECT * FROM users WHERE username = ${1}`;
      const userResult = await pool.query(existingUsernameQuery, [username]);

      // If no match found for username
      if (userResult.rows.length === 0) {
        return next({
          log: 'Error in userController.loginUser: User does not exist',
          status: 409,
          message: { error: 'Invalid Username or Password' },
        });
      }

      // Validate provided password against stored hash
      const user = userResult.rows[0];
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      // If password doesn't match
      if (!isPasswordMatch) {
        return next({
          log: 'Error in userController.loginUser: User does not exist',
          status: 409,
          message: { error: 'Invalid Username or Password' },
        });
      }

      // Store username and user ID in res.locals for further middleware functionality
      res.locals.user_id = user.user_id;
      res.locals.username = username;
      return next();
    } catch (error) {
      return next({
        log: `Error in userController.loginUser: ${error}`,
        status: 500,
        message: { error: 'Unable to verify user' },
      });
    }
  },
};

export { userController };
