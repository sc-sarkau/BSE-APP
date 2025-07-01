const request = require('supertest');
const express = require('express');
const router = require('../routes/loginAuth');

jest.mock('../models/User');
jest.mock('../middleware/auth', () => (req, res, next) => next());
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const app = express();
app.use(express.json());
app.use('/users', router);

describe('Auth Routes', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users/register', () => {
    it('should return 400 if user already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com' });

      const res = await request(app).post('/users/register').send({
        email: 'test@example.com',
        password: 'password123'
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User already exists');
    });

    it('should create a new user', async () => {
      User.findOne.mockResolvedValue(null);
      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({})
      }));

      const res = await request(app).post('/users/register').send({
        email: 'new@example.com',
        password: 'newpassword'
      });

      expect(res.status).toBe(201);
      expect(res.body.message).toBe('User created successfully');
    });
  });

  describe('POST /users (login)', () => {
    it('should return 400 if user not found', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app).post('/users').send({
        email: 'nonexistent@example.com',
        password: 'somepass'
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid email');
    });

    it('should return 400 if password is incorrect', async () => {
      User.findOne.mockResolvedValue({ email: 'test@example.com', password: 'hashedpass' });
      bcrypt.compare.mockResolvedValue(false);

      const res = await request(app).post('/users').send({
        email: 'test@example.com',
        password: 'wrongpass'
      });

      expect(res.status).toBe(400);
      expect(res.body.message).toBe('Invalid password');
    });

    it('should return token on valid credentials', async () => {
      const mockUser = { _id: 'user123', email: 'test@example.com', password: 'hashedpass' };
      User.findOne.mockResolvedValue(mockUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue('fake-token');

      const res = await request(app).post('/users').send({
        email: 'test@example.com',
        password: 'correctpass'
      });

      expect(res.status).toBe(200);
      expect(res.body.token).toBe('fake-token');
    });
  });
});
