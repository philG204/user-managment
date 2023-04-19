import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';
import { threadId } from 'worker_threads';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){}

    async findOne(id: number): Promise<User>{
        return this.userRepository.findOneBy({id});
    }

    async findAll(): Promise<User[]>{
        const allUsers = this.userRepository.find();
        console.log(allUsers);
        return allUsers;
    }

    async checkLoginCredentials(username: string, password: string ): Promise<boolean>{
        const res = this.userRepository.query("SELECT * FROM users WHERE username = :username AND password = :password;", Object.values({ username: username, password: password }));
        console.log(res);
        if(res){
            return false;
        }
        else{
            return true;
        }
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
