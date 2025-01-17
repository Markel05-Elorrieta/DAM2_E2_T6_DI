import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IHorarios } from '../interfaces/IHorarios';

@Injectable({
  providedIn: 'root',
})
export class HezkuntzaService {
  constructor(private httpClient: HttpClient) {}

  getIkasleOrdutegia(userId: number): Observable<IHorarios> {
    return this.httpClient.get<IHorarios>('http://localhost:3000/timetable-ikasle/' + userId);
  }
}
