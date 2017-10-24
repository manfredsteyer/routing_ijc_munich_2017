import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

export interface ExitComponent {
    canDeactivate();
}

@Injectable()
export class ExitGuard implements CanDeactivate<ExitComponent> {
    canDeactivate(
        component: ExitComponent,
        currentRoute: ActivatedRouteSnapshot, 
        currentState: RouterStateSnapshot
    ): Observable<boolean> {
        
        return component.canDeactivate();

    }
}