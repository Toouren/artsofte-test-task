import { Component } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';

import { AppSettings } from 'src/app/appsettings';
import { IFields } from 'src/app/types';
import { StorageWorkerService } from 'src/app/storage-worker/storage-worker.service';

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.css']
})
export class PaymentCreateComponent {
  paymentInfo: FormGroup;
  monthList: number[] = [];
  yearList: number[] = [];
  formGroupValid = false;
  successLeftAlign: string;
  errorLeftAlign: string;

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
    this.paymentInfo.setValidators([this.validateCardNumbers(), this.validateDate()]);
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

  validateCardNumbers(): ValidatorFn {
    return (group: FormGroup) => {
      const payerCardNumber = group.controls.payerCardNumber;
      const recipientCardNumber = group.controls.recipientCardNumber;
      return payerCardNumber.value === recipientCardNumber.value ? {equalNumber: true} : null;
    };
  }

  // мне очень стыдно за этот метод (если вы не видите этот коммент, то я уже все исправил)
  validateDate(): ValidatorFn {
    return (group: FormGroup) => {
      const month = parseFloat(group.controls.activeDateMonth.value);
      const year = parseFloat(group.controls.activeDateYear.value);
      if (!isNaN(month) && !isNaN(year)) {
        const setDate = new Date(2000 + year, month - 1);
        const currentDate = new Date();
        if (setDate < currentDate) {
          return { uncorrectDate: true };
        }
      }
      return null;
    };
  }

  checkFormValid() {
    this.paymentInfo.valid ? this.formGroupValid = true : this.formGroupValid = false;
  }

  valueChanged(textFields: IFields) {
    this.currentFieldsState = textFields;
    this.checkFormValid();
  }

  sendValidFormToStorage() {
    try {
      this.storageService.pushRecordToLocalStorage(this.currentFieldsState);
      this.successLeftAlign = '0';
      setTimeout(() => {
        this.successLeftAlign = '100vw';
      }, 6000);
    } catch {
      this.errorLeftAlign = '100vw';
      setTimeout(() => {
        this.errorLeftAlign = '100vw';
      }, 6000);
    } finally {
      this.paymentInfo.reset();
    }
  }

  setValuesToForm(fields: IFields) {
    this.paymentInfo.setValue(fields);
   }
}
