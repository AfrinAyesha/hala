import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppSandbox } from 'src/app/sandbox/app.sandbox';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  links = [
    {
      label: 'Dashboard',
      link: '/dashboard/users',
    },
  ];
  activeLink = this.links[0];
  constructor(private sandbox: AppSandbox, private router: Router) {}

  ngOnInit(): void {}
  logout(): void {
    this.sandbox.logout();
    this.router.navigateByUrl('/login');
  }
}
