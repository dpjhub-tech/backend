import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Health check / root greeting',
    description:
      'Returns a greeting string confirming backend API is operational.',
  })
  @ApiResponse({ status: 200, description: 'API health status ok.' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
