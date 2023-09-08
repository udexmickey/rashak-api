import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationDto } from './dto/location.dto';
import { SerializeResponse } from 'src/utils/Decorators/serializer.decorator';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

@Controller('location')
@ApiTags('Locations')
@SerializeResponse(LocationDto)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiBody({
    type: CreateLocationDto,
    description: 'Create new location',
  })
  @ApiOperation({
    description: 'Add new location imparted to the database',
    summary: 'Add new location',
  })
  @ApiCreatedResponse({
    description: 'The location has been successfully created.',
    type: CreateLocationDto,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get()
  @ApiOperation({
    description: 'Fetch all locations from the database',
    summary: 'Fetch All Locations',
  })
  @ApiOkResponse({
    description: 'Successfully fetched locations paginated data',
    type: [CreateLocationDto],
  })
  @ApiQuery({
    description:
      'you can search based on the locations properties that exists in the database',
    name: 'State',
    required: false,
    type: String,
    // example: 'Location 1',
  })
  @ApiQuery({
    description: 'Query locations base on page number',
    name: 'page',
    required: false,
    type: Number,
    // example: 2,
  })
  @ApiQuery({
    description: `Obtain locations data based on limit... max ${Number(10)}`,
    name: 'limit',
    required: false,
    type: Number,
    // example: 10,
  })
  @ApiQuery({
    description: `Obtain locations based on search word`,
    name: 'search',
    required: false,
    type: String,
    // example: 'Location 2',
  })
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Use this to obtain a location from the database',
    summary: 'Obtain a Location',
  })
  @ApiParam({
    name: 'locationId',
    description: 'provide a valid locationId that exists in the database',
    type: String,
  })
  @ApiOkResponse({ type: CreateLocationDto })
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    description:
      'Obtain a location from the database, then update the fetched location',
    summary: 'Update a Locations',
  })
  @ApiParam({
    name: 'locationId',
    description: 'provide a valid locationId that exists in the database',
    type: String,
  })
  @ApiBody({
    type: UpdateLocationDto,
    description: 'Update existing location',
  })
  @ApiOkResponse({
    description: 'Location data have been updated successfully',
    type: UpdateLocationDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'Locationed deleted successful',
  })
  @ApiOperation({
    description:
      'Obtain a location from the database, then delete the fetched location',
    summary: 'Delete a Location',
  })
  @ApiParam({
    name: 'locationId',
    description: 'provide a valid locationId that exists in the database',
    type: String,
  })
  remove(@Param('id') id: string) {
    return this.locationService.remove(id);
  }
}
