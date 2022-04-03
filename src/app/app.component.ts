import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppSandbox } from './sandbox/app.sandbox';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  showHeader = false;
  readonly subscriptions: Array<Subscription> = [];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (event.urlAfterRedirects !== '/login' && event.urlAfterRedirects !== '/register') {
            this.showHeader = true;
          } else {
            this.showHeader = false;
          }
        }
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
