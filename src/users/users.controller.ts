import {  Controller, Get, Post, Delete, Body, Param, Header, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../entity/user.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    @UseGuards(AuthGuard)
    async getAllUsers(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    @UseGuards(AuthGuard)
    async getUserById(@Param() param): Promise<User>{
        console.log(param);
        return this.userService.findOneById(param.id);
    }

    @Get(':username')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    @UseGuards(AuthGuard)
    async getUserByUsername(@Param() param): Promise<User>{
        console.log(param);
        return this.userService.findOneByUsername(param.username);
    }

    @Post('checkCredentials/')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    @UseGuards(AuthGuard)
    async checkLoginCredentials(@Body() body): Promise<boolean>{
        console.log(body);
        return this.userService.checkLoginCredentials(body.username, body.password);
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async create(@Body() user: User): Promise<User>{
        console.log("New user request");
        console.log(user);
        return this.userService.create(user);
    }

    @Post('update/:id')
    @UseGuards(AuthGuard)
    async update(@Param('id') id, @Body() user: User): Promise<any>{
        user.id = Number(id);
        return this.userService.update(user);
    }

    @Delete('remove/:id')
    @UseGuards(AuthGuard)
    async remove(@Param() id: number): Promise<void>{
        console.log(id);
        return this.userService.deleteOne(id);
    }
}
