import { CustomPreloadingStrategy } from './preloading/custom-preloading-strategy';
import { AuthGuard } from './auth/auth.guard';
import { FlightResolver } from '../flight-booking/flight-edit/flight.resolver';
import { ExitGuard } from './exit/exit.guard';
import { AuthService } from './auth/auth.service';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { LocationPipe } from "./pipes/location.pipe";
import { LocationValidationDirective } from "./validation/location.validation.directive";
import { RoundTripValidationDirective } from "./validation/round-trip.validation.directive"; 
import { AsyncLocationValidationDirective } from "./validation/async-location.validation.directive"; 

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LocationPipe,
        LocationValidationDirective,
        RoundTripValidationDirective, 
        AsyncLocationValidationDirective 
    ],
    providers: [ ],
    exports: [
        LocationPipe,
        LocationValidationDirective,
        RoundTripValidationDirective, 
        AsyncLocationValidationDirective  
    ]
})
export class SharedModule { 


    static forChild(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: []
        }
    }
    
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthGuard,
                AuthService, 
                ExitGuard,
                FlightResolver,
                CustomPreloadingStrategy
            ]
        }
    }

}