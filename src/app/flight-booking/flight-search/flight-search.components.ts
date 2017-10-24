import { Flight } from '../../entities/flight';
import { Component, OnInit, EventEmitter } from '@angular/core';

//               V----------------V--------- Explizit importiert
import { Http, URLSearchParams, Headers } from '@angular/http';
import { FlightService } from '../flight-search/flight.service'
import { Subject } from "rxjs/Rx";

@Component({
    selector: 'flight-search',
    templateUrl: './flight-search.component.html',
    styleUrls: ['./flight-search.component.css'],
    providers: [FlightService]
})
export class FlightSearchComponent implements OnInit {

    from: string = 'Hamburg';
    to: string = 'Graz';
    flights: Array<Flight> = [];
    selectedFlight: Flight;


    basket: any = {
        "3": true,
        "5": true
    };

    //private http: Http;

    constructor(private flightService: FlightService) { 
        //this.http = http;
    }

    afterSearch$ = new Subject<Flight[]>();

    search(): void {

        if (!this.from || !this.to) {
            this.afterSearch$.error('to and from expected!');
            return;
        }

        this
            .flightService
            .find(this.from, this.to)
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