import { Injectable } from '@angular/core';
import { Person } from './person';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  private API = 'https://www.mecallapi.com/api/users';

  constructor(private httpClient: HttpClient) {}

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  // HttpClient API get() method => Fetch All Data
  getPeople(): Observable<Person> {
    return this.httpClient
      .get<Person>(this.API)
      .pipe(retry(1), catchError(this.handleError));
  }

  getPerson(id: any): Observable<any> {
    return this.httpClient
      .get<any>(this.API + '/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  updatePerson(person: Person): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(person);
    return this.httpClient.put(this.API + '/update', body, {
      headers: headers,
    });
  }

  deletePerson(ids: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: ids,
      },
    };
    return this.httpClient.delete(this.API + '/delete', options);
  }

  createPerson(person: Person): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(person);
    return this.httpClient.post(this.API + '/create', body, {
      headers: headers,
    });
  }

  // Error handling
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
