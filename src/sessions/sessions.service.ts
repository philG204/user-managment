import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from '../entity/session.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class SessionsService {

    constructor(
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>){}

    async findOne(id: number): Promise<Session>{
        return this.sessionRepository.findOneBy({id});
    }

    async findSessionByUserId(userId: number): Promise<any>{
        const query = 'SELECT * FROM sessions WHERE user_id = $1';
        const result = await this.sessionRepository.query(query, [userId]);
        console.log(result);
        if(result != null && result.length != 0){
            return result[0];
        }
        return { "message": "No Session available for the user"};
    }

    async deleteOne(id: number): Promise<void>{
        await this.sessionRepository.delete(id);
    }

    async create(session: Session): Promise<Session>{
        return this.sessionRepository.save(session);
    }

    async update(session: Session): Promise<UpdateResult>{
        return this.sessionRepository.update(session.id, session);
    }
}
