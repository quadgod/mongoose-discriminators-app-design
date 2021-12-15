import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PudelDogEntity } from '../creature/entities/pudel-dog.entity';
import { Model } from 'mongoose';
import { SwordFishEntity } from '../creature/entities/sword-fish.entity';

@Injectable()
export class TestService implements OnModuleInit {
  constructor(
    // These models injected to test nested module re-injection issue
    @InjectModel(PudelDogEntity.name)
    private readonly PudelDogModel: Model<PudelDogEntity>,
    @InjectModel(SwordFishEntity.name)
    private readonly SwordFishModel: Model<SwordFishEntity>,
  ) {}

  onModuleInit() {
    if (!this.PudelDogModel || !this.SwordFishModel) {
      throw new Error('Injection problem');
    }
  }
}
