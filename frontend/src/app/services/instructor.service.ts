import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Event } from '../models/Event';
import { Instructor } from '../models/Instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  baseEndpoint = 'http://localhost:8090/api/instructor';

  constructor(private http: HttpClient) { }

  public findAll(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.baseEndpoint);
  }

  public saveInstructor(instructor: Instructor): Observable<Instructor> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const options = {
      headers: headers
    }
    return this.http.post<Instructor>(this.baseEndpoint, instructor, options);
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

  public getOverall(idInstructor: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append("idInstructor", idInstructor);
    const options = {
      headers: headers,
      params: params
    }
    return this.http.get<any>(this.baseEndpoint + '/overall', options);
  }

  public getInstructor(idInstructor: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    let params = new HttpParams();
    params = params.append("idInstructor", idInstructor);
    const options = {
      headers: headers,
      params: params
    }
    return this.http.get<any>(this.baseEndpoint + '/instructor', options);
  }
}
