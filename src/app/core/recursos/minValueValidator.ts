import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function minValueValidator(minValue : number) : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        const error = (Number(control.value) <= minValue);
        return error ? {minValue : {value : control.value}} : null;
    }
}