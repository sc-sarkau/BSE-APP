const request = require('supertest');
const { app, server } = require('../app');

afterAll((done) => {
  server.close();
  done();
});

describe('Express Server', () => {
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/unknown');
    expect(res.status).toBe(404);
  });

  it('should respond to /api/sensex route (placeholder test)', async () => {
    const res = await request(app).get('/api/sensex');
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(600);

  });

  it('should respond to /users route (placeholder test)', async () => {
    const res = await request(app).post('/users/login').send({ email: 'test', password: '1234' });
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(600);
  });
});
