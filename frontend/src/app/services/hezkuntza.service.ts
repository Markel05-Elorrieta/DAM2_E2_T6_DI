import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IOrdutegia } from '../interfaces/IOrdutegia';
import { environment } from '../environments/environment';
import { IReunionesAlumno } from '../interfaces/IReunionesAlumno';
import { IReunionesProfesor } from '../interfaces/IReunionesProfesor';
import { IIkastetxeak } from '../interfaces/IIkastetxeak';
import { IUser } from '../interfaces/IUser';
import { IReunionesGeneral } from '../interfaces/IReunionesGeneral';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HezkuntzaService {
  constructor(private httpClient: HttpClient) {}

  getAllIkasleak(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(environment.APIUrl + '/students');
  }

  getAllIrakasleak(): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(environment.APIUrl + '/teachers');
  }

  getIkasleOrdutegia(userId: number): Observable<IOrdutegia> {
    return this.httpClient.get<IOrdutegia>(
      environment.APIUrl + '/timetable-ikasle/' + userId
    );
  }

  getIrakasleOrdutegia(userId: number): Observable<IOrdutegia> {
    return this.httpClient.get<IOrdutegia>(
      environment.APIUrl + '/timetable-irakasle/' + userId
    );
  }

  getIkasleBilerak(userId: number): Observable<IReunionesAlumno> {
    return this.httpClient.get<IReunionesAlumno>(
      environment.APIUrl + '/meetings-student/' + userId
    );
  }

  getIrakasleBilerak(userId: number): Observable<IReunionesProfesor> {
    return this.httpClient.get<IReunionesProfesor>(
      environment.APIUrl + '/meetings-teacher/' + userId
    );
  }

  getIkasleBileraByID(bileraID: number): Observable<IReunionesAlumno> {
    return this.httpClient.get<IReunionesAlumno>(
      environment.APIUrl + '/meeting-student/' + bileraID
    );
  }

  getIrakasleBileraByID(bileraID: number): Observable<IReunionesProfesor> {
    return this.httpClient.get<IReunionesProfesor>(
      environment.APIUrl + '/meeting-teacher/' + bileraID
    );
  }

  getGodAdminBileraByID(bileraID: number): Observable<IReunionesGeneral> {
    return this.httpClient.get<IReunionesGeneral>(
      environment.APIUrl + '/meeting-god-admin/' + bileraID
    );
  }

  getTodayBilerak(): Observable<IReunionesGeneral[]> {
    return this.httpClient.get<IReunionesGeneral[]>(
      environment.APIUrl + '/meetings-today/'
    );
  }

  getIkastetxeaByID(id: number): Observable<IIkastetxeak> {
    return this.httpClient.get<IIkastetxeak[]>(
      `${environment.IkastetxeakAPIUrl}/IKASTETXEAK/?CCEN=${id}`
    ).pipe(
      map(data => data[0])
    );
  }

  updateUser(user: IUser): Observable<IUser> {
    const {
      id,
      nombre,
      apellidos,
      email,
      telefono1,
      username,
      dni,
      tipo_id: role,
      direccion,
    } = user;
    return this.httpClient.post<IUser>(
      `${environment.APIUrl}/user-update/${id}`,
      {
        nombre,
        apellidos,
        email,
        telefono1,
        username,
        dni,
        role,
        direccion,
      }
    );
  }

  addUser(user: IUser): Observable<IUser> {
    const {
      nombre,
      apellidos,
      email,
      telefono1,
      username,
      password,
      dni,
      tipo_id: role,
      direccion,
    } = user;
    return this.httpClient.post<IUser>(`${environment.APIUrl}/user-add/`, {
      nombre,
      apellidos,
      email,
      telefono1,
      username,
      password,
      dni,
      role,
      direccion,
    });
  }
}
