import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CreatureModule } from './creature/creature.module';
import { SubmoduleModule } from './submodule/submodule.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27777/database'),
    CreatureModule,
    SubmoduleModule,
  ],
})
export class AppModule {}
