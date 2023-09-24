import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  message: string = '';
  theLoginForm: FormGroup;
  loginSubscription: Subscription;
  isSubmitted: boolean;
  errorReturned = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.theLoginForm = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  ngOnDestroy(): void {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  login(form: FormGroup) {
    this.isSubmitted = true;

    if (form.invalid) {
      console.log('form invalid');
      return;
    }

    // this.isLoading = true;
    this.loginSubscription = this.authService
      .onLogin(form.value.username, form.value.password)
      .subscribe({
        next: (response) => {
          this.errorReturned = false;
          const user = response;
          this.authService.onUpdateAuthStatus(true);

          localStorage.setItem(
            'userId',
            JSON.stringify(user._id).replaceAll('"', '')
          );
          localStorage.setItem(
            'firstName',
            JSON.stringify(user.firstName).replaceAll('"', '')
          );
          localStorage.setItem(
            'userRole',
            JSON.stringify(user.role).replaceAll('"', '')
          );

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
          this.authService.onUpdateAuthStatus(false);
          this.errorReturned = true;
        },
      });
    // this.isLoading = false;
  }
}
