import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { Observable } from 'rxjs/internal/Observable';
import { IUserTypes } from '../interfaces/IUserTypes';

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

  deleteUser(userId: number): Observable<{ success: boolean }> {
    return this.httpClient.delete<{ success: boolean }>(`${environment.APIUrl}/user-delete/${userId}`);
  }

  getAllUserTypes(): Observable<IUserTypes[]> {
    return this.httpClient.get<IUserTypes[]>(`${environment.APIUrl}/user-types/`);
  }

  saveUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  async getUser(): Promise<IUser> {
    return JSON.parse(localStorage.getItem('user')!);
  }

  getUserInfoByID(userId: number): Observable<IUser> {
    return this.httpClient.get<IUser>(`${environment.APIUrl}/user/${userId}`);
  }

  logout() {
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}