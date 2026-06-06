import { Controller, Get, Post, Body, Param, Ip } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateImageDto } from './dto/create-image.dto';
import { Gallery } from './schemas/gallery.schema';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post()
  async create(
    @Body() createImageDto: CreateImageDto,
    @Ip() ip: string,
  ): Promise<Gallery> {
    return this.galleryService.create(createImageDto, ip);
  }

  @Get()
  async findAll(): Promise<Gallery[]> {
    return this.galleryService.findAll();
  }

  @Get('section/:section')
  async findBySection(@Param('section') section: string): Promise<Gallery[]> {
    return this.galleryService.findBySection(section);
  }
}
