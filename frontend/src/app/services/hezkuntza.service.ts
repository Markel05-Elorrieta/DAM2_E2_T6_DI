import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IOrdutegia } from '../interfaces/IOrdutegia';
import { environment } from '../environments/environment';
import { IReunionesAlumno } from '../interfaces/IReunionesAlumno';
import { IReunionesProfesor } from '../interfaces/IReunionesProfesor';

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

  getIkasleBilerak(userId: number): Observable<IReunionesAlumno> {
    return this.httpClient.get<IReunionesAlumno>(environment.APIUrl + '/meetings-student/' + userId);
  }

  getIrakasleBilerak(userId: number): Observable<IReunionesProfesor> {
    return this.httpClient.get<IReunionesProfesor>(environment.APIUrl + '/meetings-teacher/' + userId);
  }

  getIkasleBileraByID(bileraID: number): Observable<IReunionesAlumno> {
    return this.httpClient.get<IReunionesAlumno>(environment.APIUrl + '/meeting-student/' + bileraID);
  }

  getIrakasleBileraByID(bileraID: number): Observable<IReunionesProfesor> {
    return this.httpClient.get<IReunionesProfesor>(environment.APIUrl + '/meeting-teacher/' + bileraID);
  }
}
