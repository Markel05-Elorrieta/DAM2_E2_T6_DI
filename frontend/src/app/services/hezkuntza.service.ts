import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IOrdutegia } from '../interfaces/IOrdutegia';
import { environment } from '../environments/environment';
import { IReuniones } from '../interfaces/IReuniones';

@Injectable({
  providedIn: 'root',
})
export class HezkuntzaService {
  constructor(private httpClient: HttpClient) {}

  getIkasleOrdutegia(userId: number): Observable<IOrdutegia> {
    return this.httpClient.get<IOrdutegia>(environment.APIUrl + '/timetable-ikasle/' + userId);
  }

  getIrakasleOrdutegia(userId: number): Observable<IOrdutegia> {
    return this.httpClient.get<IOrdutegia>(environment.APIUrl + '/timetable-irakasle/' + userId);
  }

  getIkasleBilerak(userId: number): Observable<IReuniones> {
    return this.httpClient.get<IReuniones>(environment.APIUrl + '/meetings-student/' + userId);
  }

  getIrakasleBilerak(userId: number): Observable<IReuniones> {
    return this.httpClient.get<IReuniones>(environment.APIUrl + '/meetings-teacher/' + userId);
  }
}
