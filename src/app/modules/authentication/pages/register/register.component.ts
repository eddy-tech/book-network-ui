import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../../services/services';
import { RegistrationRequest } from '../../../../services/models';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [RouterLink, FormsModule],
})
export class RegisterComponent implements OnInit {
  registerRequest: RegistrationRequest = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  errorMessage: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  register = () => {
    this.errorMessage = [];
    this.authService
      .register({
        body: this.registerRequest,
      })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/authentication/activate-account');
        },
        error: (err) => {
          this.errorMessage = err.error.validationErrors;
        },
      });
  };

  login = () => {
    this.router.navigateByUrl('/authentication/login');
  };
}
