import { Repository } from 'typeorm';
import { Transfer } from '../entity/transfer.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  TransferInterface,
  TransferProperties,
} from '../interface/transfer.interface';

@Injectable()
export class TransferService {
  constructor(
    @InjectRepository(Transfer)
    public transferRepository: Repository<Transfer>,
  ) {}

  public async save(transfers: TransferInterface[]): Promise<void> {
    const values: TransferProperties[] = [];

    transfers.map(function (item: TransferInterface) {
      values.push({
        block_number: item.blockNumber,
        tx_hash: item.hash,
        tx_date: new Date(item.timeStamp * 1000),
        tx_value: item.value,
      });
    });

    const entities = [];

    for (let i = 0; i < values.length; i++) {
      entities.push(this.transferRepository.create(values[i]));
    }

    await this.transferRepository
      .createQueryBuilder()
      .insert()
      .into(Transfer)
      .values(entities)
      .orIgnore()
      .execute();
  }

  public async getGroupedList(days: number) {
    const date = new Date();

    date.setDate(date.getDate() - days);

    return await this.transferRepository
      .query(
        'SELECT ' +
          "time_bucket('2 hours', tx_date) AS timestamp, " +
          'sum(tx_value) AS volume ' +
          'FROM public.transfer ' +
          `WHERE tx_date >= '${date.toJSON()}' ` +
          'GROUP BY timestamp ' +
          'ORDER BY timestamp;',
      )
      .then((response) => response);
  }
}
