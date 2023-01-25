import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@Index(['block_number', 'tx_hash'], { unique: true })
export class Transfer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  block_number: number;

  @Column({ type: 'varchar', length: 255 })
  tx_hash: string;

  @Column({ type: 'timestamp' })
  tx_date: Date;

  @Column({ type: 'float' })
  tx_value: number;
}
