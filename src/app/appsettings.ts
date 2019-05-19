import { FormControl, Validators } from '@angular/forms';

export class AppSettings {
  private static FORM_CONTROL_OPTIONS = { validators: Validators.required };
  public static LOCAL_STORAGE_KEY = 'PAYMENT_HISTORY';
  public static PAYER_FIELDS = {
    payerCardNumber: new FormControl(
      null,
      AppSettings.FORM_CONTROL_OPTIONS
    ),
    payerName: new FormControl(
      null,
      AppSettings.FORM_CONTROL_OPTIONS
    ),
    activeDateMonth: new FormControl(
      null,
      AppSettings.FORM_CONTROL_OPTIONS
    ),
    activeDateYear: new FormControl(
      null,
      AppSettings.FORM_CONTROL_OPTIONS
    )
  };
  public static RECIPIENT_FIELDS = {
    recipientCardNumber: new FormControl(
      null,
      AppSettings.FORM_CONTROL_OPTIONS
    )
  };
  public static ANY_FIELDS = {
    sum: new FormControl(
      null,
      AppSettings.FORM_CONTROL_OPTIONS
    )
  };
}
