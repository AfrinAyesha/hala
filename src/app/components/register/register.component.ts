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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  showPassword = false;
  registerForm: FormGroup;
  isLoading: any;
  readonly subscriptions: Array<Subscription> = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private fb: FormBuilder,
    private sandbox: AppSandbox,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [, Validators.required],
    });
    this.getDataFromState();
  }
  getDataFromState(): void {
    this.subscriptions.push(
      this.sandbox.registerState$.subscribe((res) => {
        this.isLoading = res.isLoading;
        if (res.isLoading === false && res.errorMessage === null) {
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
  register(): void {
    this.sandbox.register(this.registerForm.value);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
