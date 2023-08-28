import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  //single file upload
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: any,
  ) {
    console.log(file);
    return {
      ...payload,
      fileName: file.originalname,
      file: file.buffer.toString(),
    };
    // const newImage = await this.partnerService.TestUploadFile(file);
    // console.log('====================================');
    // console.log('image.url', newImage.url);
    // console.log('image', newImage);
    // console.log('====================================');
    // return newImage;
  }

  //Multiply file upload
  @Post('uploads')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'background', maxCount: 1 },
    ]),
  )
  // async uploadFiles(
  //   @UploadedFiles()
  //   files: {
  //     avatar?: Express.Multer.File[];
  //     background?: Express.Multer.File[];
  //   },
  // ) {
  //   const newImage = await this.partnerService.TestUploadFiles(files);
  //   return files;
  // }
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPartnerDto: CreatePartnerDto,
  ) {
    return await this.partnerService.create(file, createPartnerDto);
  }

  @Get()
  findAll() {
    return this.partnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partnerService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnerService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partnerService.remove(id);
  }
}
