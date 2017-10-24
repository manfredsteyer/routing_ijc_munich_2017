import { Flight } from '../../entities/flight';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {ExitGuard} from '../../shared/exit/exit.guard';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit, ExitGuard {
  
  id: string;
  showDetails: string;
  flight: Flight;

  warningDialog = {
    show: false,
    sender: null
  }

  constructor(private route: ActivatedRoute) { }

  canDeactivate(): Observable<boolean> {
    this.warningDialog.show = true;
    return Observable.create((sender: Observer<boolean>) => {
      this.warningDialog.sender = sender;
    })
  }

  decide(d: boolean): void {
    this.warningDialog.show = false;
    this.warningDialog.sender.next(d);
    this.warningDialog.sender.complete();
  }

  ngOnInit() {
    this.route.params.subscribe(
      p => {
        this.id = p['id'];
        this.showDetails = p['showDetails'];
      }
    );

    this.route.data.subscribe(
      data => {
        this.flight = data['flight'];
      }
    )

  }

}
