import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>){}

    async findOne(id: number): Promise<User>{
        return this.userRepository.findOneBy({id});
    }

    async findAll(): Promise<User[]>{
        return this.userRepository.find();
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
