import request from 'supertest';
import { getRepository } from 'typeorm';
import app from '../app';
import { connect } from '../database';
import { Profile } from '../entities';

const testData = {
  profileName: 'test',
  profileOptions: '{}',
  profileActive: 1,
};

let insertedId: number = 0;

beforeAll(async () => {
  await connect();
});

describe('POST /profiles', () => {
  test('should return object response with status true and inserted id, status code 200 and headers application/json', async () => {
    const response = await request(app).post('/api/profiles').send(testData);

    const { status, id } = response.body;

    insertedId = id;

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('json');
    expect(status).toEqual(true);
    expect(id).toBeGreaterThan(0);
  });
});

describe('POST /profiles', () => {
  test('shoul return status 200 and object with status false and error message:"PROFILE_ALREADY_EXISTS" if profile already exists by name', async () => {
    const response = await request(app).post('/api/profiles').send(testData);

    const { status, error } = response.body;

    expect(response.status).toBe(200);
    expect(status).toEqual(false);
    expect(error).toEqual('PROFILE_ALREADY_EXISTS');
  });
});

describe('GET /profiles', () => {
  test('should return status code  200', async () => {
    const response = await request(app).get('/api/profiles').send();

    expect(response.statusCode).toBe(200);
  });

  test('should return an array object profile', async () => {
    const response = await request(app).get('/api/profiles').send();

    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toBeInstanceOf(Array);
  });

  test('should return an object of profile', async () => {
    const response = await request(app)
      .get(`/api/profiles/${insertedId}`)
      .send();

    const length = Object.keys(response.body).length;

    expect(length).toBeGreaterThan(0);
  });
});

describe('PUT /profiles', () => {
  test('should return status code 200', async () => {
    const response = await request(app)
      .put(`/api/profiles/${insertedId}`)
      .send(testData);

    expect(response.status).toBe(200);
  });
});

afterAll(async () => {
  await getRepository(Profile).delete(insertedId);
});
