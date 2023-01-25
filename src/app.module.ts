import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionService } from './transaction/transaction.service';
import { TransferModule } from './transfer/transfer.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { TransferService } from './transfer/transfer.service';
import { Transfer } from './entity/transfer.entity';
import typeOrmConfig from './typeorm.config';

@Module({
  imports: [
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forFeature([Transfer]),
    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig.options,
    }),
    HttpModule,
    TransferModule,
  ],
  controllers: [AppController],
  providers: [AppService, TransactionService, TransferService],
})
export class AppModule {}
