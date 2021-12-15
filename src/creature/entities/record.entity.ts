import { PudelDogEntity, PudelDogEntitySchema } from './pudel-dog.entity';
import { SwordFishEntity, SwordFishEntitySchema } from './sword-fish.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CreatureEntitySchema, KindEnum } from './creature.entity';
import mongoose from 'mongoose';

@Schema({
  collection: 'records',
  _id: false,
  versionKey: false,
})
export class RecordEntity {
  _id: string;

  @Prop({ required: true, type: CreatureEntitySchema })
  creature!: PudelDogEntity | SwordFishEntity;
}

export const RecordEntitySchema = SchemaFactory.createForClass(RecordEntity);

export const PudelDogEntityModel =
  RecordEntitySchema.path<mongoose.Schema.Types.Subdocument>(
    'creature',
  ).discriminator<PudelDogEntity>(
    PudelDogEntity.name,
    PudelDogEntitySchema,
    KindEnum.PudelDog,
  );

export const SwordFishEntityModel =
  RecordEntitySchema.path<mongoose.Schema.Types.Subdocument>(
    'creature',
  ).discriminator<SwordFishEntity>(
    SwordFishEntity.name,
    SwordFishEntitySchema,
    KindEnum.SwordFish,
  );
