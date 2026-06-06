import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Invitado, InvitadoDocument } from './schemas/invitado.schema';
import { CreateInvitadoDto } from './dto/create-invitado.dto';

@Injectable()
export class InvitadosService {
  constructor(
    @InjectModel(Invitado.name)
    private readonly invitadoModel: Model<InvitadoDocument>,
  ) {}

  // Registrar un invitado (RSVP)
  async create(createInvitadoDto: CreateInvitadoDto): Promise<Invitado> {
    const nuevoInvitado = new this.invitadoModel(createInvitadoDto);
    return nuevoInvitado.save();
  }

  // Obtener todos los invitados confirmados
  async findAll(): Promise<Invitado[]> {
    return this.invitadoModel.find().exec();
  }
}
