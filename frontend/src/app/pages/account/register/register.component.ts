import { Component, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  fb = inject(FormBuilder);
  auth = inject(AuthService);
  router = inject(Router);
  error = '';
  showPassword: boolean = false;

  constructor() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
        ],
      ],
      password2: ['', [Validators.required]],
    });
    effect(() => (this.error = this.auth.registerError()));
  }
  get passwordFieldType(): string {
    return this.showPassword ? 'text' : 'password';
  }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  registerUser() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    } else {
      this.auth.registerUser(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
      });
    }
  }
}
