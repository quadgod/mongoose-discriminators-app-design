import { Test, TestingModule } from '@nestjs/testing';
import { CreatureModule } from '../creature.module';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { INestApplication } from '@nestjs/common';
import { RecordDao } from './record.dao';
import { RecordEntity } from '../entities/record.entity';
import { KindEnum } from '../entities/creature.entity';
import { FishTypeEnum } from '../entities/sword-fish.entity';
import { SubmoduleModule } from '../../submodule/submodule.module';

describe('record dao', () => {
  let app: INestApplication;
  let dao: RecordDao;
  let model: Model<RecordEntity>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27777/test'),
        CreatureModule,
        SubmoduleModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    dao = app.get<RecordDao>(RecordDao);
    model = app.get(getModelToken(RecordEntity.name));
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    await model.deleteMany({});
  });

  it('should insert pudel', async () => {
    const pudel: any = {
      creature: {
        kind: KindEnum.PudelDog,
        owner: 'Me',
        name: 'Chappy',
      },
    };

    const inserted = await dao.insert(pudel);
    expect(inserted).toEqual({ ...pudel, _id: expect.anything() });
    expect(await model.countDocuments({}).exec()).toEqual(1);
  });

  it('should insert sword fish', async () => {
    const swordFish: any = {
      creature: {
        kind: KindEnum.SwordFish,
        type: FishTypeEnum.Sea,
      },
    };

    const inserted = await dao.insert(swordFish);
    expect(inserted).toEqual({ ...swordFish, _id: expect.anything() });
    expect(await model.countDocuments({}).exec()).toEqual(1);
  });

  it('should not insert sword fish because invalid type field', async () => {
    const swordFish: any = {
      creature: {
        kind: KindEnum.SwordFish,
      },
    };

    await expect(dao.insert(swordFish)).rejects.toThrow('creature.type');
  });

  it('should not insert sword fish because invalid type value', async () => {
    const swordFish: any = {
      creature: {
        kind: KindEnum.SwordFish,
        type: 'unknown',
      },
    };

    await expect(dao.insert(swordFish)).rejects.toThrow('creature.type');
  });

  it('should not insert pudel because invalid name field', async () => {
    const pudel: any = {
      creature: {
        kind: KindEnum.PudelDog,
        owner: 'Me',
      },
    };

    await expect(dao.insert(pudel)).rejects.toThrow('creature.name');
  });

  it('should not insert because invalid kind field', async () => {
    const pudel: any = {
      creature: {
        owner: 'Me',
        name: 'Chappy',
      },
    };

    await expect(dao.insert(pudel)).rejects.toThrow('creature.kind');
  });

  it('should not insert sword fish because invalid creature.sea.name field', async () => {
    const swordFish: any = {
      creature: {
        kind: KindEnum.SwordFish,
        type: FishTypeEnum.Sea,
        sea: {
          description: '123',
        },
      },
    };

    await expect(dao.insert(swordFish)).rejects.toThrow('creature.sea.name');
  });

  it('should insert sword fish with sea field', async () => {
    const swordFish: any = {
      creature: {
        kind: KindEnum.SwordFish,
        type: FishTypeEnum.Sea,
        sea: {
          name: 'Black sea',
          description: 'Water is not black',
        },
      },
    };

    expect(await model.countDocuments({}).exec()).toEqual(0);
    const insertResult = await dao.insert(swordFish);
    expect(insertResult).toEqual({ ...swordFish, _id: expect.anything() });
    expect(await model.countDocuments({}).exec()).toEqual(1);
  });

  it('should not update sword fish because invalid creature.kind field', async () => {
    const swordFish: any = {
      creature: {
        kind: KindEnum.SwordFish,
        type: FishTypeEnum.Sea,
        sea: {
          name: 'Black sea',
          description: 'Water is not black',
        },
      },
    };

    expect(await model.countDocuments({}).exec()).toEqual(0);
    const insertResult = await dao.insert(swordFish);
    expect(insertResult).toEqual({ ...swordFish, _id: expect.anything() });
    expect(await model.countDocuments({}).exec()).toEqual(1);
    delete swordFish.creature.kind;
    await expect(
      dao.update({ _id: insertResult._id }, swordFish),
    ).rejects.toThrow('kind');
  });

  it('should not update sword fish because invalid creature.sea.name field', async () => {
    const swordFish: any = {
      creature: {
        kind: KindEnum.SwordFish,
        type: FishTypeEnum.Sea,
        sea: {
          name: 'Black sea',
          description: 'Water is not black',
        },
      },
    };

    expect(await model.countDocuments({}).exec()).toEqual(0);
    const insertResult = await dao.insert(swordFish);
    expect(insertResult).toEqual({ ...swordFish, _id: expect.anything() });
    expect(await model.countDocuments({}).exec()).toEqual(1);
    delete swordFish.creature.sea.name;
    await expect(
      dao.update({ _id: insertResult._id }, swordFish),
    ).rejects.toThrow('sea.name');
  });
});
