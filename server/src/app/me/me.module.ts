import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/app/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [MeController],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, MeService],
})
export class MeModule {}
