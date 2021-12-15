import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum KindEnum {
  PudelDog = 'pudelDog',
  SwordFish = 'swordFish',
}

@Schema({
  autoCreate: false,
  discriminatorKey: 'kind',
  _id: false,
})
export class CreatureEntity {
  @Prop({ required: true, type: String, enum: Object.values(KindEnum) })
  kind!: KindEnum;
}

export const CreatureEntitySchema =
  SchemaFactory.createForClass(CreatureEntity);
