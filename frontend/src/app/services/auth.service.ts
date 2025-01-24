import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(email: string): Observable<{ success: boolean; user: IUser }> {
    return this.httpClient.post<{ success: boolean; user: IUser }>(`${environment.APIUrl}/login`, { email });
  }

  getUserType(userId: number): Observable<{ userType: String }> {
    return this.httpClient.get<any>(`${environment.APIUrl}/user-type/${userId}`);
  }

  saveUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): IUser {
    return JSON.parse(localStorage.getItem('user')!);
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}