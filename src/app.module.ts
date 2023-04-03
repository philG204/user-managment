import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Session } from './entity/session.entity';
import { UsersModule } from './users/users.module';
import { SessionsionModule } from './sessions/sessions.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: '10.56.1.21',
    port: 5432,
    username: 'postgres',
    password: '7_!?FHrE89',
    database: 'home-dev',
    entities: [User, Session],
    synchronize: true
  }), UsersModule, SessionsionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
