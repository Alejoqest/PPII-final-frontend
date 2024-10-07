import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function outboundsYearValidator() : ValidatorFn {
    return (control : AbstractControl) : ValidationErrors | null => {
        const date = new Date();
        const error = (Number(control.value) > date.getFullYear())
        return error ? {outboundsYear : {value : control.value}} : null;
    }
}