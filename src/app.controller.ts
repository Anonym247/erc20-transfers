import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { TransactionService } from './transaction/transaction.service';
import { TransferService } from './transfer/transfer.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly transactionService: TransactionService,
    private readonly transferService: TransferService,
  ) {}

  @Get('/subscribe')
  async subscribe(): Promise<number> {
    return this.transactionService.subscribeTransferEvents().then((res) => res);
  }

  @Get('/fetch-last-events')
  async fetchLastEvents(): Promise<number> {
    const transferService = this.transferService;

    this.transactionService
      .getLatestTransferEvents()
      .then(function (data: object) {
        transferService.save(data['result']).then(function () {
          return 1;
        });
      });

    return 1;
  }
}
