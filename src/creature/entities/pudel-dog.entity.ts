import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { KindEnum } from './creature.entity';

@Schema({ autoCreate: false, _id: false })
export class PudelDogEntity {
  kind!: KindEnum.PudelDog;

  @Prop({ required: true })
  name!: string;

  @Prop()
  owner?: string;
}

export const PudelDogEntitySchema =
  SchemaFactory.createForClass(PudelDogEntity);
