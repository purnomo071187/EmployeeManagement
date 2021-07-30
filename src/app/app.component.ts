import { Component } from '@angular/core';
import { AuthenticationService } from './service/authentication/authentication.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'cf-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'employee';

  dropdownControl = new FormControl(null, Validators.required);

  constructor(public authenticationService: AuthenticationService){

  }

  logout() {
    this.authenticationService.logout();
  }

}
