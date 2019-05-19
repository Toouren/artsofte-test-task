import { FormControl, Validators } from '@angular/forms';

export class AppSettings {
  private static FORM_CONTROL_VALIDATORS = {
    required: Validators.required,
    namePattern: Validators.pattern(/[a-zA-Z]+ [a-zA-Z]+/)
  };

  public static LOCAL_STORAGE_KEY = 'PAYMENT_HISTORY';
  public static PAYER_FIELDS = {
    payerCardNumber: new FormControl(
      null,
      {
        validators: AppSettings.FORM_CONTROL_VALIDATORS.required
      }
    ),
    payerName: new FormControl(
      null,
      {
        validators: [
          AppSettings.FORM_CONTROL_VALIDATORS.required,
          AppSettings.FORM_CONTROL_VALIDATORS.namePattern
        ]
      }
    ),
    activeDateMonth: new FormControl(
      null,
      {
        validators: AppSettings.FORM_CONTROL_VALIDATORS.required
      }
    ),
    activeDateYear: new FormControl(
      null,
      {
        validators: AppSettings.FORM_CONTROL_VALIDATORS.required
      }
    )
  };
  public static RECIPIENT_FIELDS = {
    recipientCardNumber: new FormControl(
      null,
      {
        validators: AppSettings.FORM_CONTROL_VALIDATORS.required
      }
    )
  };
  public static ANY_FIELDS = {
    sum: new FormControl(
      null,
      {
        validators: AppSettings.FORM_CONTROL_VALIDATORS.required
      }
    )
  };
}
