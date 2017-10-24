import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'flight-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Hello World!';
  showWaitInfo = false;

  constructor(
    private oauthService: OAuthService,
    private router: Router) {

      oauthService.configure({
          issuer: 'https://steyer-identity-server.azurewebsites.net/identity',
          redirectUri: window.location.origin + '/index.html',
          clientId: 'spa-demo',
          scope: 'openid profile email voucher'
      });


      this.oauthService.tokenValidationHandler = new JwksValidationHandler();
      this.oauthService.loadDiscoveryDocumentAndTryLogin();

      this.oauthService.setupAutomaticSilentRefresh();

  }


  doStuff() {
    this.title = "Goodbye!";
  }


  ngOnInit() {
    this
      .router
      .events
      .filter(e => e instanceof NavigationStart)
      .subscribe(_ => {
        this.showWaitInfo = true;
      });
  
      this
        .router
        .events
        .filter(e => 
          e instanceof NavigationEnd
          || e instanceof NavigationCancel
          || e instanceof NavigationError )
        .subscribe(_ => {
          this.showWaitInfo = false;
        });
  
    }
}
