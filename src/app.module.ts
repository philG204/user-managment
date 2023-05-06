import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: 'postgres',
    password: '7_!?FHrE89',
    database: 'home-dev',
    entities: [User],
    synchronize: true
  }), UsersModule, AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
