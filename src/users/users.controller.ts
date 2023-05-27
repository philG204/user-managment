import {  Controller, Get, Post, Delete, Body, Param, Header, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entity/user.entity';
import { AuthGuard } from '../auth/auth.guard';
import { v4 as uuidv4 } from 'uuid';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}    

    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    @Header('Access-Control-Allow-Origin', process.env.ALLOWED_DOMAIN)
    @UseGuards(AuthGuard)
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    @Header('Access-Control-Allow-Origin', process.env.ALLOWED_DOMAIN)
    @UseGuards(AuthGuard)
    async getUserById(@Param() param): Promise<User>{
        console.log(param);
        return this.userService.findOneById(param.id);
    }

    @Get(':username')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    @Header('Access-Control-Allow-Origin', process.env.ALLOWED_DOMAIN)
    @UseGuards(AuthGuard)
    async getUserByUsername(@Param() param): Promise<User>{
        console.log(param);
        return this.userService.findOneByUsername(param.username);
    }

    @Post('checkCredentials')
    @Header('Content-Type', 'application/json')
    @UseGuards(AuthGuard)
    async checkLoginCredentials(@Body() body): Promise<{}>{
	const res = this.userService.checkLoginCredentials(body.body.username, body.body.password);
	return res;
    }

    @Post('checkToken')
    @Header('Content-Type', 'application/json')
    @UseGuards(AuthGuard)
    async checkToken(@Body() body): Promise<boolean>{
        return this.userService.checkToken(body.jwt);
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async create(@Body() body: any): Promise<User>{
	console.log("New user request");
	console.log(body.body.pass);
	console.log(body);
        const user = new User();
        const guid:string = uuidv4();
        console.log(guid);
        user.username = body.body.username;
        user.firstname = body.body.firstname;
        user.lastname = body.body.firstname;
        user.email = body.body.email;
        user.pass = body.body.pass;
        console.log(user);
        return this.userService.create(user);
    }

    @Post('update/:id')
    @UseGuards(AuthGuard)
    async update(@Param('id') id, @Body() user: User): Promise<any>{
        user.id = String(id);
        return this.userService.update(user);
    }

    @Delete('remove/:id')
    @UseGuards(AuthGuard)
    async remove(@Param() id: number): Promise<void>{
        console.log(id);
        return this.userService.deleteOne(id);
    } 
}

