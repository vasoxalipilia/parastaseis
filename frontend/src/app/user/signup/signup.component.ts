import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { RetypeConfirm } from 'src/app/validators/password-confirm.validator';
import { SignupAuthData } from '../interfaces/signup.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, OnDestroy {
  theSignupForm: FormGroup;
  signupDate: string;
  signupSubscription: Subscription;
  isSubmitted: boolean;
  errorReturned = false;
  constructor(
    private appService: AppService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.theSignupForm = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      firstName: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required],
      }),
      // photoPath: new FormControl(null, {
      //   // validators: [Validators.required],
      //   asyncValidators: [imgMimeType],
      // }),
      passwordsForm: new FormGroup({
        password: new FormControl(null, {
          validators: [Validators.required],
        }),
        passwordConfirm: new FormControl(null, {
          validators: [Validators.required, RetypeConfirm('password')],
        }),
      }),
    });
  }

  ngOnDestroy(): void {
    if (this.signupSubscription) {
      this.signupSubscription.unsubscribe();
    }
  }

  signup(form: FormGroup) {
    this.isSubmitted = true;
    if (form.invalid) {
      console.log('invalid form');
      return;
    }

    this.signupDate = this.appService.getDateString();

    // this.isLoading = true;

    const user: SignupAuthData = {
      username: form.value.username,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      signupDate: this.signupDate,
      password: form.value.passwordsForm.password,
      passwordConfirm: form.value.passwordsForm.passwordConfirm,
    };

    this.signupSubscription = this.authService.onSignup(user).subscribe(
      {
        next: (response) => {
          this.errorReturned = false;
          const user: any = response;
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
        },
      }
      // (data) => {
      //   this.router.navigate(['/']);
      //   let duration = parseInt(data.expiresIn);
      //   this.setAuthTimer(duration);
      //   const now = new Date();
      //   const expirationDate = new Date(now.getTime() + duration * 1000);
      //   this.saveToStorage(expirationDate);
      // },
      // (error) => {
      //   this.authStatusListener.next(false);
      // }
    );

    // this.isLoading = false;
  }
}
