import { Module } from '@nestjs/common';
import { Session } from '../entity/session.entity';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Session])],
    controllers: [SessionsController],
    providers: [SessionsService],
})
export class SessionsionModule {}
