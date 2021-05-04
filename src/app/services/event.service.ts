import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  public updateEvent(idInstructor: string, idEvent: string, eventToEdit: Event): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append("idInstructor", idInstructor);
    params = params.append("idEvent", idEvent);
    const options = {
      headers: headers,
      params: params
    }
    return this.http.put<any>(this.baseEndpoint, eventToEdit, options);
  }

  public deleteEvent(idEvent: string, idInstructor: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append("idEvent", idEvent);
    params = params.append("idInstructor", idInstructor);
    const options = {
      headers: headers,
      params: params
    }
    return this.http.delete<any>(this.baseEndpoint, options);
  }
}
