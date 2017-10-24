import { OAuthService } from 'angular-oauth2-oidc';
import { Flight } from '../../entities/flight';
import { BASE_URL } from '../../app.tokens';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class FlightService {

    constructor(
        private http: HttpClient,
        private oauthService: OAuthService,
        @Inject(BASE_URL) private baseUrl: string) { 
    }

    findById(id: string): Observable<Flight> {
        let url = this.baseUrl + 'flight';
        
                let params = new HttpParams()
                                    .set('id', id);
        
                let headers = new HttpHeaders()
                                    .set('Accept', 'application/json');
        
                return this.http.get<Flight>(url, { params, headers });    
                
    }

    find(from: string, to: string): Observable<Flight[]> {
        
        let url = this.baseUrl + 'flight';

        let params = new HttpParams()
                            .set('from', from)
                            .set('to', to);

       let headers = new HttpHeaders()
                            .set('Accept', 'application/json');
                            
        return this.http.get<Flight[]>(url, { params, headers });    

    }
}