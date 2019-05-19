import { HistoryComponent } from './layout/history/history.component';
import { PaymentCreateComponent } from './layout/payment-create/payment-create.component';
import { Type } from '@angular/core';

export interface ISection {
  appCompName: string;
  title: string;
  value: Type<HistoryComponent|PaymentCreateComponent>;
  defaultChecked?: boolean;
}

export interface IFields {
  payerCardNumber?: string;
  payerName?: string;
  activeDateMonth?: string;
  activeDateYear?: string;
  recipientCardNumber?: string;
  sum?: string;
}

export interface IStorageRecord {
  date: Date;
  fields: IFields;
  key: string;
}
