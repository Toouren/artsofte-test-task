import { Component } from '@angular/core';
import { ISection } from './types';

import { HistoryComponent } from './layout/history/history.component';
import { PaymentCreateComponent } from './layout/payment-create/payment-create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  sections: ISection[] = [];
  currentSection: ISection;

  constructor() {
    this.sections.push(
      { appCompName: 'payment-create', title: 'Создать платеж', value: PaymentCreateComponent, defaultChecked: true},
      { appCompName: 'history', title: 'История платежей', value: HistoryComponent}
    );
    this.currentSection = this.sections[0];
  }

  sectionChanged(event: Event) {
    const currentSectionName = (event.target as HTMLInputElement).value;
    this.currentSection = this.sections.find(section => section.appCompName === currentSectionName);
  }
}
