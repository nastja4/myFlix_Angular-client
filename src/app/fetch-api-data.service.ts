import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';  // 'rxjs/internal/operators' doesn't work
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class FetchApiDataService {

//   constructor() { }
// }


//Declaring the api url that will provide data for the client app
const apiUrl = 'https://movies-my-flix-307c49ee24e7.herokuapp.com/';

// using the decorator to tell Angular that this service will be available everywhere (hence the root)
@Injectable({     
  providedIn: 'root'
})

// export class UserRegistrationService {
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {    
  }


 // Making the api calls for the endpoints

 // User registration 
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

  // User login
  userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Get all movies
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      // map(this.extractResponseData),
      map((value: any) => this.extractResponseData(value)),
      catchError(this.handleError)
    );
  }

  // Get a single movie by title
  getMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      // map(this.extractResponseData),
      map((value: any) => this.extractResponseData(value)),
      catchError(this.handleError)
    );
  }

  // Get a director by name
  getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/' + name, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      // map(this.extractResponseData),
      map((value: any) => this.extractResponseData(value)),
      catchError(this.handleError)
    );
  }

  // Get a genre by name
  getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/' + name, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      // map(this.extractResponseData),
      map((value: any) => this.extractResponseData(value)),
      catchError(this.handleError)
    );
  }

  // Get user by username
  getOneUser(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + user.Username, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      // map(this.extractResponseData),
      map((value: any) => this.extractResponseData(value)),
      catchError(this.handleError)
    );
  }
  

  // Get favorite movies for a user  
  getFavoriteMovies(): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.get(`${apiUrl}users/${user.Username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map((response: any) => response.FavoriteMovies),
      catchError(this.handleError)
    );
  }

  // Add a movie to the user's favorites
  addMovieToFavorites(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.post(`${apiUrl}users/${user.Username}/movies/${movieId}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      // map(this.extractResponseData),
      map((value: any) => this.extractResponseData(value)),
      catchError(this.handleError)
    );
  }

  // Delete a movie from favorite movies
  deleteMovieFromFavorites(movieId: string): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${user.Username}/movies/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      // map(this.extractResponseData),
      map((value: any) => this.extractResponseData(value)),
      catchError(this.handleError)
    );
  }


  // Edit user info
  editUser(userData: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.Username;
    const token = localStorage.getItem('token');

    if (!username || !token) {
      // Handle the case where username or token is missing
      return throwError(() => new Error('User data is missing'));
    }
    return this.http.put(`${apiUrl}users/${username}`, userData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      // map(this.extractResponseData),
      map((value: any) => this.extractResponseData(value)),
      catchError(this.handleError)
    );
  }

  // Delete user
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(`${apiUrl}users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      })
    }).pipe(
      // map(this.extractResponseData),
      map((value: any) => this.extractResponseData(value)),
      catchError(this.handleError)
    );
  }
  


  // Non-typed response extraction
  // private extractResponseData(res: Response): any {
  private extractResponseData(res: HttpResponse<any>): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
          `Error Status code ${error.status}, ` +
          `Error body: ${JSON.stringify(error.error)}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}