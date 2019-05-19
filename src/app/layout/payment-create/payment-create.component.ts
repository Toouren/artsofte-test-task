import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppSettings } from 'src/app/appsettings';
import { IFields, IStorageRecord } from 'src/app/types';
import { LocalStorageService } from 'ngx-webstorage';
import { StorageWorkerService } from 'src/app/storage-worker/storage-worker.service';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent {
  private paymentInfo: FormGroup;
  private monthList: number[] = [];
  private yearList: number[] = [];
  private formGroupValid = false;
  private currentFieldsState: IFields;

  defineMonthList() {
    for (let monthNumber = 1; monthNumber <= 12; monthNumber++) {
      this.monthList.push(monthNumber);
    }
  }

  defineYearList() {
    const currentYear = new Date().getFullYear();
    const gapYear = currentYear + 10;
    for (let yearNumber = currentYear; yearNumber <= gapYear; yearNumber++) {
      this.yearList.push(yearNumber % 100);
    }
  }

  constructor(private storageService: StorageWorkerService) {
    this.defineMonthList();
    this.defineYearList();
    this.paymentInfo = new FormGroup(
      Object.assign({},
        AppSettings.PAYER_FIELDS,
        AppSettings.RECIPIENT_FIELDS,
        AppSettings.ANY_FIELDS)
      );
    this.currentFieldsState = this.paymentInfo.value;
    this.paymentInfo.valueChanges.subscribe((textFields: IFields) => this.valueChanged(textFields));
    this.storageService.repeatPayEvent.subscribe((fields: IFields) => this.setValuesToForm(fields));
    this.checkFormValid();
  }

  validateSum() {
    const formSumControl = this.paymentInfo.controls.sum;
    const sumNumber = parseFloat(formSumControl.value);
    const newValue =
      sumNumber < 100 ? '100' :
      sumNumber > 1000000 ? '1000000' :
      formSumControl.value;
    formSumControl.setValue(newValue);
  }

  checkFormValid() {
    this.paymentInfo.valid ? this.formGroupValid = true : this.formGroupValid = false;
  }

  valueChanged(textFields: IFields) {
    this.currentFieldsState = textFields;
    this.checkFormValid();
  }

  sendValidFormToStorage() {
    console.log(this.currentFieldsState);
    this.storageService.pushRecordToLocalStorage(this.currentFieldsState);
    this.paymentInfo.reset();
  }

  setValuesToForm(fields: IFields) {
    this.paymentInfo.setValue(fields);
   }
}
