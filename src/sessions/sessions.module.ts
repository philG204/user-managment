import { Module } from '@nestjs/common';
import { Session } from '../entity/session.entity';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
    imports: [TypeOrmModule.forFeature([Session]), AuthModule],
    controllers: [SessionsController],
    providers: [SessionsService],
})
export class SessionsionModule {}
