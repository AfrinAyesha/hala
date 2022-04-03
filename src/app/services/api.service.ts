import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from '../interfaces/login.interface';
import { Register } from '../interfaces/register.interface';

@Injectable()
export class ApiService {
  currenctURL = 'authaccount';
  constructor(private httpClient: HttpClient) {}

  public register(formData: Register): Observable<any> {
    return this.httpClient.post(
      `${environment.baseURL}/${this.currenctURL}/registration/`,
      formData
    );
  }

  public login(formData: Login): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}/${this.currenctURL}/login/`, formData);
  }
}
