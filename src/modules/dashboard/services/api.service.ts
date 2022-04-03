import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

export class ModuleConfig {
  public baseURL: string;
  public spaURL: string;
}

@Injectable()
export class ApiService {
  baseURL: string;
  currentURL = 'users';
  constructor(private httpClient: HttpClient, options: ModuleConfig) {
    this.baseURL = options.baseURL;
  }
  public getUsersList(pageNumber: number): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${this.currentURL}?page=${pageNumber + 1}`);
  }

  public addUser(data: User): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/${this.currentURL}`, data);
  }
  public editUser(data: User): Observable<any> {
    return this.httpClient.put(`${this.baseURL}/${this.currentURL}/${data.id}`, data);
  }
  public deleteUser(id: number): Observable<any> {
    return this.httpClient.delete(`${this.baseURL}/${this.currentURL}/${id}`);
  }
}
