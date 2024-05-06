import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthenticationRequest } from '../../../../services/models';
import { AuthenticationService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, RouterLink],
})
export class LoginComponent implements OnInit {
  authRequest: AuthenticationRequest = {
    email: '',
    password: '',
  };

  errorMessage: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {}

  login = () => {
    this.errorMessage = [];
    console.log(this.authRequest);

    this.authService.authenticate({
        body: this.authRequest,
      })
      .subscribe({
        next: (response) => {
          console.log(response);

          this.tokenService.token = response.access_token as string;
          this.router.navigateByUrl('/books');
        },
        error: (err) => {
          if(err.error.validationErrors) {
            this.errorMessage = err.error.validationErrors;
          } else {
            this.errorMessage.push(err.error.businessErrorDescription);
          }
        }
      });
  };

  register = () => {
    this.router.navigateByUrl('/authentication/register');
  };
}
