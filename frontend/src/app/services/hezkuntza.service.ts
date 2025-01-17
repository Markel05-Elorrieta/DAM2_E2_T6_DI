import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IOrdutegia } from '../interfaces/IOrdutegia';

@Injectable({
  providedIn: 'root',
})
export class HezkuntzaService {
  constructor(private httpClient: HttpClient) {}

  getIkasleOrdutegia(userId: number): Observable<IOrdutegia> {
    return this.httpClient.get<IOrdutegia>('http://localhost:3000/timetable-ikasle/' + userId);
  }
}
