import { Module, Provider } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import {
  CreatureEntity,
  CreatureEntitySchema,
} from './entities/creature.entity';
import { PudelDogEntity } from './entities/pudel-dog.entity';
import { SwordFishEntity } from './entities/sword-fish.entity';
import {
  PudelDogEntityModel,
  RecordEntity,
  RecordEntitySchema,
  SwordFishEntityModel,
} from './entities/record.entity';
import { RecordDao } from './daos/record.dao';
import { SeaEntity, SeaEntitySchema } from './entities/sea.entity';

const EntitiesModule = MongooseModule.forFeature([
  { name: RecordEntity.name, schema: RecordEntitySchema },
  { name: CreatureEntity.name, schema: CreatureEntitySchema },
  { name: SeaEntity.name, schema: SeaEntitySchema },
]);

const providers: Provider[] = [
  RecordDao,
  {
    provide: getModelToken(PudelDogEntity.name),
    useValue: PudelDogEntityModel,
  },
  {
    provide: getModelToken(SwordFishEntity.name),
    useValue: SwordFishEntityModel,
  },
];

@Module({
  providers,
  imports: [EntitiesModule],
  exports: [EntitiesModule, RecordDao, ...providers],
})
export class CreatureModule {}
