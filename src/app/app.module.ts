import { NgxMaskModule } from 'ngx-mask';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaymentCreateComponent } from './layout/payment-create/payment-create.component';
import { HistoryComponent } from './layout/history/history.component';
import { LayoutComponent } from './layout/layout.component';
import { StorageWorkerService } from './storage-worker/storage-worker.service';

@NgModule({
  declarations: [
    AppComponent,
    PaymentCreateComponent,
    HistoryComponent,
    LayoutComponent
  ],
  entryComponents: [
    HistoryComponent,
    PaymentCreateComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgxWebstorageModule.forRoot()
  ],
  providers: [StorageWorkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
