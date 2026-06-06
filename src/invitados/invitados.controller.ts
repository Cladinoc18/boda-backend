import { Controller, Get, Post, Body } from '@nestjs/common';
import { InvitadosService } from './invitados.service';
import { CreateInvitadoDto } from './dto/create-invitado.dto';
import { Invitado } from './schemas/invitado.schema';

@Controller('invitados')
export class InvitadosController {
  constructor(private readonly invitadosService: InvitadosService) {}

  @Post()
  async create(@Body() createInvitadoDto: CreateInvitadoDto): Promise<Invitado> {
    return this.invitadosService.create(createInvitadoDto);
  }

  @Get()
  async findAll(): Promise<Invitado[]> {
    return this.invitadosService.findAll();
  }
}
