import { Test } from '@nestjs/testing';
import { IdeasController } from '../../src/ideas/ideas.controller';
import { IdeasService } from '../../src/ideas/ideas.service';
import { createTestingModule } from '../setup';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('IdeasController', () => {
  let app: INestApplication;
  let ideasService: IdeasService;

  beforeEach(async () => {
    const module = await createTestingModule();
    ideasService = module.get<IdeasService>(IdeasService);
    app = module.createNestApplication();
    await app.init();
  });

  it('GET /ideas should return all ideas', async () => {
    const ideas = [{ id: 1, title: 'Test Idea', description: 'Test Description', user: { id: 1 } }];
    jest.spyOn(ideasService, 'findAll').mockResolvedValue(ideas as any);
    const response = await request(app.getHttpServer()).get('/ideas');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(ideas);
  });

  afterEach(async () => {
    await app.close();
  });
});