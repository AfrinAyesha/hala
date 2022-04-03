import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from '../interfaces/user.interface';
import * as fromStore from '../store';

@Injectable()
export class DashboardSandbox {
  public usersList$ = this.store.pipe(select(fromStore.getUsersList));
  constructor(private store: Store<fromStore.DashboardState>) {}

  public getUsers(pageNumber: number): void {
    this.store.dispatch(fromStore.GetUsersList({ pageNumber }));
  }
  public addUser(data: User): void {
    this.store.dispatch(fromStore.AddUser({ data }));
  }
  public editUser(data: User): void {
    this.store.dispatch(fromStore.EditUser({ data }));
  }
  public deleteUser(id: number): void {
    this.store.dispatch(fromStore.DeleteUser({ id }));
  }
}
