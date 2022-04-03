import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { DashboardSandbox } from '../../sandbox/dashboard.sandbox';
import { AddUpdateComponent } from '../add-update/add-update.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  readonly subscriptions: Array<Subscription> = [];
  displayedColumns: string[] = ['id', 'name', 'email', 'location', 'edit', 'delete'];

  data = [];

  resultsLength = 0;
  pageSize = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private sandbox: DashboardSandbox,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sandbox.getUsers(0);
    this.subscriptions.push(
      this.sandbox.usersList$.subscribe((res) => {
        console.log(res);
        this.isLoadingResults = res.isLoading;
        if (res.data.length > 0) {
          this.data = res.data;
          this.pageSize = res.perPage;
          this.resultsLength = res.totalPages;
        }
        if (res.hasError) {
          const snackBarRef = this._snackBar.open(res.errorMessage, 'Dismiss', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'error-container',
          });
          snackBarRef.onAction().subscribe((data) => {
            this._snackBar.dismiss();
          });
        }
      })
    );
  }
  openDialog(type, data?): void {
    const dialogRef = this.dialog.open(AddUpdateComponent, {
      data: { pageType: type, ...(type === 'edit' ? { data } : {}) },
      width: '50%',
      height: 'auto',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        if (result.pageType === 'add') {
          this.sandbox.addUser(result.data);
        } else {
          this.sandbox.editUser({ ...result.data, id: data.id });
        }
        console.log(result);
      }
    });
  }
  action(type, data): void {
    if (type === 'delete') {
      this.sandbox.deleteUser(data.id);
    } else {
      this.openDialog('edit', data);
    }
  }
  pageEvent(event): void {
    this.sandbox.getUsers(event.pageIndex);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
