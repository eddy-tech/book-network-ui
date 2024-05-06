import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CodeInputModule } from 'angular-code-input';
import { AuthenticationService } from '../../../../services/services';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [RouterLink, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css'],
})
export class ActivateAccountComponent implements OnInit {
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {}

  redirectToLogin = () => {
    this.router.navigate(['/authentication/login']);
  };

  onCodeCompleted = (token: string) => {
    this.submitted = true;
    this.authService.confirm({ token }).subscribe({
      next: () => {
        this.message =
          'Your account has been successfully activated!\n Now you can proceed to login';
        this.isOkay = true;
      },
      error: () => {
        this.message =
          'Your account could not be activated or your token has been expired or invalid. Please try again.';
        this.isOkay = false;
      },
    });
  };
}
