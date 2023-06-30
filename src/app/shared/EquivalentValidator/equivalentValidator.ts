import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const EquivalentValidator = (firstControlName: string | undefined, secondControlName: string | undefined): ValidatorFn => {

  return (control: AbstractControl): ValidationErrors | null => {
    if (!firstControlName || !secondControlName) return null;

    const firstControl = control.get(firstControlName);
    const secondControl = control.get(secondControlName);

    if(!secondControl || !firstControl) return null;

    if (secondControl.value && secondControl.value !== firstControl.value) {
      secondControl.setErrors({ notEqual: true });
    }

    return null;
  };

};