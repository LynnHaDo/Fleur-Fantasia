import { FormControl, ValidationErrors } from '@angular/forms';

export class FleurValidators {

  static checkWhitespace(control: FormControl): ValidationErrors | null {
    const violated = control.value != null && control.value.trim().length < 2;
    return violated ? { checkWhitespace: true } : null;
  }

}
