import { Controller, Get, Post, Body, Delete, Param, Query } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Music } from './schemas/music.schema';

@Controller('music')
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Post()
  async create(@Body() createSongDto: CreateSongDto): Promise<Music> {
    return this.musicService.create(createSongDto);
  }

  @Get()
  async findAll(): Promise<Music[]> {
    return this.musicService.findAll();
  }

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Query('pin') pin: string,
  ): Promise<{ message: string }> {
    await this.musicService.remove(id, pin);
    return { message: 'Sugerencia de canción eliminada correctamente.' };
  }
}
