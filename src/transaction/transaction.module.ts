import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Web3Module } from 'nest-web3';
import { HttpModule } from '@nestjs/axios';
import { TransferService } from '../transfer/transfer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from '../entity/transfer.entity';

@Module({
  imports: [
    Web3Module.forRoot({
      name: 'eth',
      url: 'wss://eth-mainnet.g.alchemy.com/v2/pYd6jBjl7M5CYGxHxptcQ3s41Apaiprh',
    }),
    HttpModule,
    TypeOrmModule.forFeature([Transfer]),
  ],
  controllers: [],
  providers: [TransactionService, TransferService],
})
export class TransactionModule {}
