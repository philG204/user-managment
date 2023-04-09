import { Injectable } from '@nestjs/common';
import { Config } from 'src/interface/config.interface';
import * as config from '@nestjs/config';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    private readonly config: Config;

    constructor(private readonly configService: config.ConfigService){
        this.config = JSON.parse(fs.readFileSync(this.configService.get<string>('API_KEY_DIRECTORY') + this.configService.get<string>('API_KEY_FILE'), 'utf-8')) as Config;
        console.log(this.config.apiKey);
    }

    async validateApiKey(apikey: string): Promise<boolean> {
        if(apikey == this.config.apiKey){
            return true;
        }
        else{
            return false;
        }
    }

    generateApiKey(): string {
        const apiKey = crypto.randomBytes(20).toString('hex');
        return apiKey;
      }
}
