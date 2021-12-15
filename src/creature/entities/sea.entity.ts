import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ autoCreate: false, _id: false })
export class SeaEntity {
  @Prop({ required: true })
  name!: string;

  @Prop()
  description?: string;
}

export const SeaEntitySchema = SchemaFactory.createForClass(SeaEntity);
