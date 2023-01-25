import { Web3Service } from 'nest-web3';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TransferService } from '../transfer/transfer.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly web3Service: Web3Service,
    private readonly httpService: HttpService,
    private readonly transferService: TransferService,
  ) {}

  async subscribeTransferEvents() {
    const client = this.web3Service.getClient('eth');
    const self = this;
    client.eth.subscribe(
      'logs',
      {
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      },
      function (error, log: any) {
        const abiDecoded = client.eth.abi.decodeLog(
          [
            {
              indexed: true,
              name: 'from',
              type: 'address',
            },
            {
              indexed: true,
              name: 'to',
              type: 'address',
            },
            {
              indexed: false,
              name: 'value',
              type: 'uint256',
            },
          ],
          log.data,
          log.topics.slice(1),
        );

        self.parseAndSaveTransaction(log, abiDecoded);
      },
    );

    return client.eth.getChainId();
  }

  async parseAndSaveTransaction(log, abiDecoded): Promise<void> {
    const object: any = {
      blockNumber: log.blockNumber,
      hash: log.transactionHash,
      value: abiDecoded.value.length > 19 ? 0 : abiDecoded.value / 1000000,
    };

    const client = this.web3Service.getClient('eth');

    await client.eth.getBlock(log.blockHash).then(function (value) {
      object.timeStamp = value.timestamp;
    });

    await this.transferService.save([object]);
  }

  async getLatestTransferEvents(): Promise<object> {
    const { data } = await firstValueFrom(
      this.httpService.get(
        'https://api.etherscan.io/api' +
          '?module=account' +
          '&action=tokentx' +
          '&apikey=ASE7G45DBQESBAVQT8IDNKQMVCFK3CVUQS' +
          '&sort=desc' +
          '&page=1' +
          '&contractaddress=0xdAC17F958D2ee523a2206206994597C13D831ec7' +
          '&offset=10000',
      ),
    );

    return data;
  }
}
