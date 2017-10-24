import { FlightService } from './flight.service';
import { Flight } from '../../entities/flight';
import { Observable } from 'rxjs/Rx';
import { expand } from 'rxjs/operator/expand';
import { FlightCardComponent } from './flight-card.component';
import { BASE_URL } from '../../app.tokens';
import { FlightSearchComponent } from './flight-search.components';
import { FlightBookingModule } from '../flight-booking.module';
import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';

// import '../../rxjs-imports';
import 'rxjs/add/observable/timer';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/sample';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/filter';


let result = [
    { id: 17, from: 'Graz', to: 'Hamburg', date: 'now'},
    { id: 18, from: 'Vienna', to: 'Barcelona', date: 'now'},
    { id: 19, from: 'Frankfurt', to: 'Salzburg', date: 'now'},
];

let flightServiceMock = {
    find(from: string, to: string): Observable<Flight[]> {
       return Observable.of(result);
    }
}




describe('flight-search.component', () => {


    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule, FlightBookingModule],
            providers: [
                { provide: BASE_URL, useValue: ''}
            ]
        }).compileComponents();

        TestBed.overrideComponent(FlightSearchComponent, {
            set: {
                providers: [
                    {
                        provide: FlightService,
                        useValue: flightServiceMock
                    }
                ]
            }
        }).compileComponents();

    }));

    it('should not have any flights loaded initially', () => {
        let fixture = TestBed.createComponent(FlightSearchComponent);
        let comp = fixture.componentInstance;

        // let fs = fixture.debugElement.injector.get(FlightService);
        // spyOn(fs, 'find').and.returnValue(result);

        expect(comp.flights.length).toBe(0);
    });

    it('should not load flights w/o from and to', () => {
        let fixture = TestBed.createComponent(FlightSearchComponent);
        let comp = fixture.componentInstance;

        comp.from = '';
        comp.to = '';
        comp.search();

        expect(comp.flights.length).toBe(0);

    });

    it('should not load flights w/ from and to', () => {
        let fixture = TestBed.createComponent(FlightSearchComponent);
        let comp = fixture.componentInstance;

        comp.from = 'Hamburg';
        comp.to = 'Graz';
        comp.search();

        expect(comp.flights.length).toBe(3);
    });


});