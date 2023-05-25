import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';
import { verify } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){}

    async findOneById(id: number): Promise<User>{
        return this.userRepository.findOneBy({id});
    }

    async findOneByUsername(username: string): Promise<User>{
        return this.userRepository.query("SELECT * FROM users WHERE username = $1", [ username ]);
    }

    async findAll(): Promise<User[]>{
        const allUsers = this.userRepository.find();
        console.log(allUsers);
        return allUsers;
    }

    async checkLoginCredentials(username: string, password: string ): Promise<{}>{
	const res = await this.userRepository.query("SELECT * FROM users WHERE username = $1 AND pass = $2;", [username, password]);
	console.log("type of res: " + typeof res);
	console.log("res variable: " + res);
	console.log("first entry of res: " + res[0]);
        if(typeof res[0] === 'undefined'){
            return { "token": "", success: false, user: {name: "", email: ""}};
        }
        else{
            // Create JWT
            const user = this.findOneByUsername(username);
            const payload = { username: (await user).username, exp: Math.floor(Date.now() / 1000)+432000, iat: Math.floor(Date.now() / 1000) };
            const secretKey = process.env.SK_FILE;
            const token = jwt.sign(payload, secretKey);
            console.log("token :" + token);
	    return { "token": token, success: true, user: {name: (await user).username, email: (await user).email}};
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
      const guid: string = uuid4();
      user.id = guid;
      return this.userRepository.save(user);
    }

    async update(user: User): Promise<UpdateResult>{
        return this.userRepository.update(user.id, user);
    }
}
