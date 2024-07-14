import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthenticationService, RegisterRequestParams } from '../../../shared/services/api';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  registerRequest: RegisterRequestParams = {
    registrationRequest: { email: '', firstname: '', lastname: '', password: '' }
  };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) {
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.errorMsg = [];
    this.authService.register(this.registerRequest).subscribe({
      next: () => {
        this.toastr.success('Your account has been created successfully.');
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
 }
