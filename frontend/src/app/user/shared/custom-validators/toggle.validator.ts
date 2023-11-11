import { AbstractControl, ValidatorFn } from '@angular/forms';

function customValidator(otherControlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // control.value contains the current value of the form control being validated
    // You can access the value of the other control using formGroup.get() and its name
    const otherControlValue = control.root.get(otherControlName)!.value;

    // Add your validation logic here, and return an object with an error key if the validation fails
    // For example, if you want to enforce that the current control value should be greater than the other control value:
    if (control.value <= otherControlValue) {
      return { customValidation: true };
    }

    // Return null if validation passes
    return null;
  };
}
