import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeLayoutComponent } from '../../../shared/layouts/home-layout/home-layout.component';
import { FormsModule } from '@angular/forms';
import { AuthenticateRequestParams, AuthenticationService } from '../../../shared/services/api';
import { TokenService } from '../../token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HomeLayoutComponent
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {

  authRequest: AuthenticateRequestParams = {
    authenticationRequest: {
      email: '',
      password: ''
    }
  };

  errorMsg: Array<string> = [];

  constructor(
    private authService: AuthenticationService,
    private tokenService: TokenService,
    private router: Router
  ) { }


  login() {
    this.authService.authenticate(this.authRequest).subscribe({
      next: (res) => {
        this.tokenService.token = res.token as string;
        this.router.navigate(['']);
      },
      error:(err) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg);
        }
      }
    })
  }

  register() {
    this.router.navigate(['/register']);
  }
}
