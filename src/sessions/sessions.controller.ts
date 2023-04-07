import { Controller, Get, Post, Delete, Body, Param, Header, HttpStatus, HttpCode, UseGuards } from '@nestjs/common';
import { Session } from '../entity/session.entity';
import { SessionsService } from './sessions.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('sessions')
export class SessionsController {

    constructor(private readonly sessionService: SessionsService){}

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    @UseGuards(AuthGuard)
    async getSession(id: number): Promise<Session>{
        return this.sessionService.findOne(id);
    }

    @Get('getSessionByUserId/:id')
    @HttpCode(HttpStatus.OK)
    @Header('Content-Type', 'application/json')
    @UseGuards(AuthGuard)
    async getSessionByUserId(@Param() param): Promise<Session>{
        console.log(param);
        return this.sessionService.findSessionByUserId(param.id);
    }

    @Post('create')
    @UseGuards(AuthGuard)
    async createSession(@Body() session: Session): Promise<Session>{
        console.log(session);
        return this.sessionService.create(session);
    }

    @Post('update/:id')
    @UseGuards(AuthGuard)
    async updateSession(@Param('id') id, @Body() session: Session): Promise<any>{
        session.id = Number(id);
        return this.sessionService.update(session);
    }

    @Delete('remove/:id')
    @UseGuards(AuthGuard)
    async removeSession(@Param(':id') id: number): Promise<void>{
        return this.sessionService.deleteOne(id);
    }
}
