import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppSandbox } from 'src/app/sandbox/app.sandbox';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading: any;
  showPassword = false;
  readonly subscriptions: Array<Subscription> = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private sandbox: AppSandbox,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [, Validators.required],
    });
    this.subscriptions.push(
      this.sandbox.loginState$.subscribe((res) => {
        this.isLoading = res.isLoading;
        if (res.isLoggedIn) {
          this.router.navigateByUrl('/dashboard/users');
        } else if (res.errorMessage) {
          const snackBarRef = this._snackBar.open(res.errorMessage, 'Dismiss', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            panelClass: 'error-container',
          });
          snackBarRef.onAction().subscribe((data) => {
            this._snackBar.dismiss();
          });
        }
      })
    );
  }
  login(): void {
    this.sandbox.login(this.loginForm.value);
  }
  register(): void {
    this.router.navigateByUrl('/register');
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
