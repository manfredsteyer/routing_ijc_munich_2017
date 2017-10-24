import { FlightService } from '../flight-booking/flight-search/flight.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Flight } from '../entities/flight';

//               V----------------V--------- Explizit importiert
import { Http, URLSearchParams, Headers } from '@angular/http';
import { Subject } from "rxjs/Rx";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'reactive-flight-search',
    templateUrl: './reactive-flight-search.components.html',
    styleUrls: ['./reactive-flight-search.components.css'],
    providers: [FlightService]
})
export class ReactiveFlightSearchComponent implements OnInit {


    filter: FormGroup;

    flights: Array<Flight> = [];
    selectedFlight: Flight;

    formMetadata = [
        { name: 'from', label: 'Airport of departure'},
        { name: 'to', label: 'Airport of destination'}
    ];

    basket: any = {
        "3": true,
        "5": true
    };

    //private http: Http;

    constructor(private fb: FormBuilder, private flightService: FlightService) { 
        //this.http = http;

        this.filter = fb.group({
            from: ['Graz', Validators.required],
            to: ['Hamburg']
        });

        this.filter.valueChanges.subscribe((changes) => {
            console.debug('Formular hat sich geändert', changes);
        })

    }

    afterSearch$ = new Subject<Flight[]>();

    search(): void {

        let value = this.filter.value;

        if (!value.from || !value.to) {
            this.afterSearch$.error('to and from expected!');
            return;
        }

        this
            .flightService
            .find(value.from, value.to)
            .subscribe(
                (flights: Flight[]) => {
                    this.flights = flights;
                    this.afterSearch$.next(this.flights);
                },
                (errResponse) => {
                    this.afterSearch$.error(errResponse);
                    console.error('Fehler beim Laden', errResponse);
                }
            );


    }

    select(f: Flight): void {
        this.selectedFlight = f;
    }

    ngOnInit() { }
}