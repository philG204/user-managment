import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';
import { verify } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){}

    async findOneById(id: number): Promise<User>{
        return this.userRepository.findOneBy({id});
    }

    async findOneByUsername(username: string): Promise<User>{
        return this.userRepository.query("SELECT * FROM users WHERE username = :username", [ username ]);
    }

    async findAll(): Promise<User[]>{
        const allUsers = this.userRepository.find();
        console.log(allUsers);
        return allUsers;
    }

    async checkLoginCredentials(username: string, password: string ): Promise<boolean | string>{
        const res = this.userRepository.query("SELECT * FROM users WHERE username = :username AND password = :password;", Object.values({ username: username, password: password }));
        console.log(res);
        if(res == null){
            return false;
        }
        else{
            // Create JWT
            const user = this.findOneByUsername(username);
            const payload = { username: (await user).username, exp: Math.floor(Date.now() / 1000)+432000, iat: Math.floor(Date.now() / 1000) };
            const secretKey = process.env.SK_FILE;

            const token = jwt.sign(payload, secretKey);
            return token;
        }
    }

    async checkToken(jwt: string): Promise<boolean>{
        const sk = JSON.parse(fs.readFileSync(String(process.env.SK_DIRECTORY) + String(process.env.SK_FILE), 'utf-8'))
        return verify(jwt, sk);
    }

    async deleteOne(id: number): Promise<void>{
        await this.userRepository.delete(id);
    }

    async create(user: User): Promise<User>{
       return this.userRepository.save(user);
    }

    async update(user: User): Promise<UpdateResult>{
        return this.userRepository.update(user.id, user);
    }
}
