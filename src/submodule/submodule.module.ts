import { CreatureModule } from '../creature/creature.module';
import { Module } from '@nestjs/common';
import { TestService } from './test.service';

@Module({
  imports: [CreatureModule],
  providers: [TestService],
})
export class SubmoduleModule {}
