import { Component } from '@angular/core';
import { IStorageRecord } from 'src/app/types';
import { StorageWorkerService } from 'src/app/storage-worker/storage-worker.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  private storageRecords: IStorageRecord[];
  constructor(private storageService: StorageWorkerService) {
    this.storageRecords = storageService.getCurrentRecordsList();
    this.storageService.storageChangedEvent.subscribe(
      (newStorageRecords: IStorageRecord[]) => this.storageRecords = newStorageRecords
    );
  }

  renderCardNumber(cardNumber: string): string {
    const cardNumberPartsArray = cardNumber.split(' ');
    const resultNumberPartsArray = [];
    for (let i = 0; i < 3; i++) {
      resultNumberPartsArray.push(cardNumberPartsArray[i].replace(/[0-9]/g, '*'));
    }
    resultNumberPartsArray.push(cardNumberPartsArray[cardNumberPartsArray.length - 1]);
    return resultNumberPartsArray.join(' ');
  }

  reverseCurrentStorage() {
    const reversedArray = Array.from(this.storageRecords.reverse());
    this.storageRecords.reverse();
    return reversedArray;
  }

  renderDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }

  repeatPay(key: string) {
    this.storageService.repeatPay(key);
  }

  deleteRecord(key: string) {
    this.storageService.deleteRecordFromLocalStorage(key);
  }
}
