import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  baseEndpoint = 'http://localhost:8090/api/event';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseEndpoint);
  }
}
