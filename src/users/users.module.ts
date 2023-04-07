import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthModule } from 'src/auth/auth.module';
//import { AuthGuard } from 'src/auth/auth.guard';

@Module({
    imports: [TypeOrmModule.forFeature([User]), AuthModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
