import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, FilterQuery, Model } from 'mongoose';
import { RecordEntity } from '../entities/record.entity';
import { PudelDogEntity } from '../entities/pudel-dog.entity';
import { SwordFishEntity } from '../entities/sword-fish.entity';

@Injectable()
export class RecordDao {
  constructor(
    @InjectModel(RecordEntity.name)
    private readonly RecordModel: Model<RecordEntity>,
    // These models injected to test nested module re-injection issue
    @InjectModel(PudelDogEntity.name)
    private readonly PudelDogModel: Model<PudelDogEntity>,
    @InjectModel(SwordFishEntity.name)
    private readonly SwordFishModel: Model<SwordFishEntity>,
  ) {}

  async insert(
    record: RecordEntity,
  ): Promise<Pick<Document, '_id'> & RecordEntity> {
    const result = await this.RecordModel.insertMany(
      new this.RecordModel(record),
      { ordered: true, rawResult: true },
    );
    const [insertedId] = Object.values(result.insertedIds);
    return this.RecordModel.findById(insertedId).lean();
  }

  update(
    filter: FilterQuery<RecordEntity & Pick<Document, '_id'>>,
    update: RecordEntity & Pick<Document, '_id'>,
  ): Promise<RecordEntity> {
    return this.RecordModel.findOneAndUpdate(filter, update, {
      lean: true,
      new: true,
      runValidators: true,
    }).exec();
  }
}
