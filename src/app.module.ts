import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Session } from './entity/session.entity';
import { UsersModule } from './users/users.module';
import { SessionsionModule } from './sessions/sessions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '7_!?FHrE89',
    database: 'home-dev',
    entities: [User, Session],
    synchronize: true
  }), UsersModule, SessionsionModule, AuthModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
