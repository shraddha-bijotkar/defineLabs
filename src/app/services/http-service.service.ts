import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Venue } from '../models/venues.model';

const URL = "https://api.foursquare.com/v2/venues/search?ll=40.7484,-73.9857&oauth_token=NPKYZ3WZ1VYMNAZ2FLX1WLECAWSMUVOQZOIDBN53F3LVZBPQ&v=20180616";
const jsonServerURL = "http://localhost:3000/venues";

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  getAllMatches(): Observable<any> {
    return this.http.get(URL).pipe(
      catchError(this.handleError)
    );
  }

  getAllSavedMatches(): Observable<any> {
    return this.http.get(jsonServerURL).pipe(
      catchError(this.handleError)
    );
  }

  postMatch(match: Venue): Observable<any> {
    return this.http.post(jsonServerURL, match).pipe(
      catchError(this.handleError)
    );
  }

  deleteMatchById(id: string): Observable<any> {
    return this.http.delete(jsonServerURL+"/"+id).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.')
  }

}
