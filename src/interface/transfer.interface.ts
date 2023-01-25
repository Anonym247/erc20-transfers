export interface TransferInterface {
  blockNumber: number;
  hash: string;
  timeStamp: number;
  value: number;
}

export interface TransferProperties {
  block_number: number;
  tx_hash: string;
  tx_date: Date;
  tx_value: number;
}
