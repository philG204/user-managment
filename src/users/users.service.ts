import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';
import { verify } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){}

    async findOneById(id: string): Promise<User>{
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
        const passwdHash = await this.userRepository.query("SELECT pass FROM users WHERE username = $1", [username]);
	    console.log("Type of passwdHash: " + typeof passwdHash);
	    console.log("Type of passwdHash[0].pass: " + typeof passwdHash[0].pass);
	    if(typeof passwdHash[0] != 'undefined'){
            const passwordMatch = await bcrypt.compare(password, passwdHash[0].pass);	
        
            if(!passwordMatch){
                return { token: "", code: 2, success: false, user: null};
            }
            else{
                // Create JWT
                const user = this.findOneByUsername(username);
                const payload = { username: (await user).username, exp: Math.floor(Date.now() / 1000)+432000, iat: Math.floor(Date.now() / 1000) };
                const secretKey = process.env.SK_FILE;
                const token = jwt.sign(payload, secretKey);
                console.log("token :" + token);
	            return { "token": token, code: 0, success: true, user: {name: (await user).username, email: (await user).email}};
            }
        }
        else{
            return { token: "", code: 1, success: false, user: null};
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
      const guid: string = uuidv4();
      console.log("Value :" + guid);
      console.log("Type: " + typeof guid);
      user.id = guid;
      console.log("user.id variable value: " + user.id);
      console.log(user);
      console.log(typeof user);
      return this.userRepository.save(user);
    }

    async update(user: User): Promise<UpdateResult>{
        return this.userRepository.update(user.id, user);
    }
}
