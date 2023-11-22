import { userController } from '../server/controllers/userController.ts';
import { Request, Response, NextFunction } from 'express';
import pool from '../server/database.ts';
import bcrypt from 'bcryptjs';

// Mocking requests, responses, and next function
const req: Request = {};
const res: Response = {};
const next: NextFunction = jest.fn();

// Mock database connection
jest.mock('../database.ts', () => ({
  query: jest.fn(),
}));

// Mock bcrypt methods
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('userController', () => {
  // Clear mock functions
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    // Test: should handle registration successfully
    it('should handle registration successfully', async () => {
      await userController.registerUser(req, res, next);
      expect(next).toHaveBeenCalled;
    });
  });

  describe('loginUser', () => {});
});
