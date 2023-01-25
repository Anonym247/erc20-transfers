import { Body, Controller, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferIndexRequestDto } from './dto/transfer-index-request.dto';

@Controller('transfers')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post('/')
  async index(@Body() request: TransferIndexRequestDto) {
    const data = await this.transferService.getGroupedList(request.days);

    return { data: data };
  }
}
