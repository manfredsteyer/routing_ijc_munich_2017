
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from "@angular/forms";

@Directive({ 
    selector: 'input[location]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: LocationValidationDirective,
            multi: true
        }
    ]
})
export class LocationValidationDirective implements Validator {
    constructor() { }

    @Input() location: string;

    validate(control: AbstractControl): any {

        let allowedLocations = this.location.split(',');
        let value = control.value;

        if (allowedLocations.indexOf(value) > -1) {
            return { };
        }

        return {
            location: {
                actual: value,
                allowed: allowedLocations,
                reason: 42,
                tryAgain: 60
            }
        }

    }

}