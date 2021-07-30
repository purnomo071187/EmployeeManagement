import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SignInData } from '../model/signInData';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'cf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isFormInvalid = false;
  areCredentialsInvalid = false;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  onSubmit(signInform: NgForm){
    if(!signInform.valid){
      this.isFormInvalid = true;
      this.areCredentialsInvalid = false;
      return;
    }
    this.checkCredentials(signInform);
  }

  private checkCredentials(signInform: NgForm){
    const signInData = new SignInData(signInform.value.email, signInform.value.password);
    if(!this.authenticationService.authenticate(signInData)){
      this.isFormInvalid = false;
      this.areCredentialsInvalid = true;
    }
  }

}
