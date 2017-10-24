import { AuthService } from '../shared/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    template: `
        <h2 *ngIf="!userName" style="color: white;">Welcome!</h2>
        <h2 *ngIf="userName" style="color: white;">Welcome, {{userName}}!</h2>
        <p>
            <button class="btn btn-default" (click)="login()">Login</button>
            <button class="btn btn-default" (click)="logout()">Logout</button>
        </p>
    `
})

export class HomeComponent implements OnInit {
    constructor(private authService: AuthService) { }

    get userName() {
        return this.authService.userName;
    }

    login() {
        this.authService.login();
    }

    logout() {
        this.authService.logout();
    }

    ngOnInit() { }
}