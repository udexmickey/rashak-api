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
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('partner')
@ApiTags('Partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  //single file upload
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Create new partner, **Note** After creating a new partner the file/image will be hosting on cloudinary, a reference to the image path url on cloudinary will be sent back to the user',
    schema: {
      type: 'object',
      properties: {
        companyName: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({
    description: 'Add new partner imparted to the database',
    summary: 'Add new partner',
  })
  @ApiCreatedResponse({
    description: 'The partner has been successfully created.',
    type: CreatePartnerDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createPartnerDto: CreatePartnerDto,
  ) {
    return await this.partnerService.create(file, createPartnerDto);
  }

  @Get()
  @ApiOperation({
    description: 'Fetch all partners from the database',
    summary: 'Fetch All Partners',
  })
  @ApiOkResponse({
    description: 'Successfully fetched partners paginated data',
    type: [CreatePartnerDto],
  })
  @ApiQuery({
    description: 'Query partners base on page number',
    name: 'page',
    required: false,
    type: Number,
    // example: 2,
  })
  @ApiQuery({
    description: `Obtain partners data based on limit... max ${Number(10)}`,
    name: 'limit',
    required: false,
    type: Number,
    // example: 10,
  })
  findAll() {
    return this.partnerService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Use this to obtain a partner from the database',
    summary: 'Obtain a Partner',
  })
  @ApiParam({
    name: 'partnerId',
    description: 'provide a valid partnerId that exists in the database',
    type: String,
  })
  @ApiOkResponse({ type: CreatePartnerDto })
  findOne(@Param('id') id: string) {
    return this.partnerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    description:
      'Obtain a partner from the database, then update the fetched partner',
    summary: 'Update a Partners',
  })
  @ApiParam({
    name: 'partnerId',
    description: 'provide a valid partnerId that exists in the database',
    type: String,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description:
      'Update existing partner, **Note** After Update existing the partner the file/image will be hosting on cloudinary, a reference to the image path url on cloudinary will be sent back to the user and then stored in the database as string',
    schema: {
      type: 'object',
      properties: {
        companyName: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOkResponse({
    description: 'Partner data have been updated successfully',
    type: UpdatePartnerDto,
  })
  update(@Param('id') id: string, @Body() updatePartnerDto: UpdatePartnerDto) {
    return this.partnerService.update(id, updatePartnerDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Partnered deleted successful',
  })
  @ApiOperation({
    description:
      'Obtain a partner from the database, then delete the fetched partner',
    summary: 'Delete a Partner',
  })
  @ApiParam({
    name: 'partnerId',
    description: 'provide a valid partnerId that exists in the database',
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.partnerService.remove(id);
  }
}
