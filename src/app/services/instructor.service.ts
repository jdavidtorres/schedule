import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Instructor } from '../models/instructor';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  baseEndpoint = 'http://localhost:8090/api/instructor';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.baseEndpoint);
  }

  public assignEventToInstructor(event: Event, idInstructor: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append("idInstructor", idInstructor);

    const options = {
      headers: headers,
      params: params
    }
    return this.http.post(this.baseEndpoint + '/assign-event', event, options);
  }
}
