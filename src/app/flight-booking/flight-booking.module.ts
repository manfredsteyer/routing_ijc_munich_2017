import { RouterModule } from '@angular/router';
import { FlightService } from './flight-search/flight.service';
import { AuthGuard } from '../shared/auth/auth.guard';
import { FlightBookingComponent } from './flight-booking.component';
import { PassengerSearchComponent } from '../passenger-search/passenger-search.component';
import { FlightCardComponent } from './flight-search/flight-card.component';
import { FlightSearchComponent } from './flight-search/flight-search.components';
import { FLIGHT_SEARCH_ROUTES } from './flight-booking.routes';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { ReactiveFlightSearchComponent } from "../reactive-flight-search/reactive-flight-search.components";
import { FlightEditComponent } from './flight-edit/flight-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,        
        RouterModule.forChild(FLIGHT_SEARCH_ROUTES),
        SharedModule
    ],
    declarations: [
        ReactiveFlightSearchComponent,
        PassengerSearchComponent,
        FlightSearchComponent,
        FlightCardComponent,
        FlightEditComponent,
        FlightBookingComponent

    ],
    providers: [
        FlightService
    ],
    exports: [
        ReactiveFlightSearchComponent,
        FlightSearchComponent
    ]
})
export class FlightBookingModule { }