import { Test, TestingModule } from '@nestjs/testing';
import { ApplicationsController } from './applications.controller';

describe('ApplicationsController', () => {
  let controller: ApplicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicationsController],
    }).compile();

    controller = module.get<ApplicationsController>(ApplicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have array of objects', () => {
    expect(controller.findAll()).toEqual(
      expect.arrayContaining([expect.any(Object)]),
    );
  });

  it('array should contain an object with given properties', () => {
    expect(controller.findAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          jobTitle: 'DevOps Engineer',
          companyName: 'FusionTech',
        }),
      ]),
    );
  });
});
