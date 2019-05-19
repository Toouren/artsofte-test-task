import { Injectable, EventEmitter } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { IStorageRecord, IFields } from '../types';
import { AppSettings } from '../appsettings';

@Injectable()
export class StorageWorkerService {

  private currentRecordsList: IStorageRecord[];
  public storageChangedEvent: EventEmitter<IStorageRecord[]> = new EventEmitter();
  public repeatPayEvent: EventEmitter<IFields> = new EventEmitter();

  constructor(private localStorageService: LocalStorageService) {
    this.currentRecordsList = this.localStorageService.retrieve(AppSettings.LOCAL_STORAGE_KEY) || [];
    this.localStorageService.observe(AppSettings.LOCAL_STORAGE_KEY).subscribe(() => this.localStorageChanged());
  }

  public getCurrentRecordsList() {
    return this.currentRecordsList;
  }

  private generateUniqueHash(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private generateStorageRecord(validFormFields: IFields): IStorageRecord {
    return {
      key: this.generateUniqueHash(),
      fields: validFormFields,
      date: new Date()
    };
  }

  private localStorageStoreCurrentList() {
    this.localStorageService.store(AppSettings.LOCAL_STORAGE_KEY, this.currentRecordsList);
  }

  public pushRecordToLocalStorage(validFormFields: IFields) {
    const newStorageRecord = this.generateStorageRecord(validFormFields);
    this.currentRecordsList.push(newStorageRecord);
    this.localStorageStoreCurrentList();
  }

  public deleteRecordFromLocalStorage(key: string) {
    this.currentRecordsList = this.currentRecordsList.filter(record => record.key !== key);
    this.localStorageStoreCurrentList();
  }

  private localStorageChanged() {
    this.currentRecordsList = this.localStorageService.retrieve(AppSettings.LOCAL_STORAGE_KEY);
    this.emitStorageChangedEvent();
  }

  private emitStorageChangedEvent() {
    this.storageChangedEvent.emit(this.currentRecordsList);
  }

  private emitRepeatPayEvent(fields: IFields) {
    this.repeatPayEvent.emit(fields);
  }

  public repeatPay(key: string) {
    const repeatedRecord = this.currentRecordsList.find(record => record.key === key);
    this.emitRepeatPayEvent(repeatedRecord.fields);
  }
}
