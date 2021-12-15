import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { KindEnum } from './creature.entity';
import { SeaEntity, SeaEntitySchema } from './sea.entity';

export enum FishTypeEnum {
  River = 'river',
  Lake = 'lake',
  Sea = 'sea',
}

@Schema({ autoCreate: false, _id: false })
export class SwordFishEntity {
  kind!: KindEnum.SwordFish;

  @Prop({ required: true, type: String, enum: Object.values(FishTypeEnum) })
  type!: FishTypeEnum;

  @Prop({ required: false, type: SeaEntitySchema })
  sea?: SeaEntity;
}

export const SwordFishEntitySchema =
  SchemaFactory.createForClass(SwordFishEntity);
