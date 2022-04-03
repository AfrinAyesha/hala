import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Login } from '../interfaces/login.interface';
import { Register } from '../interfaces/register.interface';
import * as fromStore from '../store';

@Injectable()
export class AppSandbox {
  public registerState$ = this.store.pipe(select(fromStore.getRegisterState));
  public loginState$ = this.store.pipe(select(fromStore.getLoginState));
  public isLoggedIn$ = this.store.pipe(select(fromStore.isLoggedIn));
  constructor(private store: Store<fromStore.AppState>) {}

  public register(data: Register): void {
    this.store.dispatch(fromStore.RegisterUser({ data }));
  }

  public login(data: Login): void {
    this.store.dispatch(fromStore.login({ data }));
  }

  public loginFail(): void {
    this.store.dispatch(fromStore.LoginFailure({ errorMessage: 'Please login' }));
  }
  public logout(): void {
    this.store.dispatch(fromStore.authLogout());
    localStorage.removeItem('token');
  }
}
