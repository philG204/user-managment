import { Injectable } from '@nestjs/common';
import { Config } from 'src/interface/config.interface';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
    private readonly config: Config;

    constructor(){
        try{
            this.config = JSON.parse(fs.readFileSync(String(process.env.API_KEY_DIRECTORY) + String(process.env.API_KEY_FILE), 'utf-8')) as Config;
            console.log(String(process.env.API_KEY_DIRECTORY) + String(process.env.API_KEY_FILE));
        }
        catch(e){
            console.log("No file found");
            console.log(e);
        }
    }

    async validateApiKey(apikey: string): Promise<boolean> {
        try{
            console.log(apikey);
            console.log(this.config.apiKey);
            if(apikey == this.config.apiKey){
                return true;
            }
            else{
               return false;
            }
        }
        catch(e){
            console.log("No API-Key found");
            return false;
        }
    }

    generateApiKey(): string {
        const apiKey = crypto.randomBytes(20).toString('hex');
        return apiKey;
      }
}
