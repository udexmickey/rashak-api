import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiTags,
  ApiBearerAuth,
  ApiSecurity,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';

@Controller()
@ApiTags('ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    description: 'welcome... Kindly login to continue using the api',
    summary: 'welcome text...',
  })
  @ApiOkResponse({
    description: 'Welcome to Rashak api...',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
