import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';  // 'rxjs/internal/operators' doesn't work
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

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

  // -1- User registration 
  /**
   * Register a new user.
   *
   * This method sends a POST request to register a new user with the provided details.
   * 
   * @param {Object} userDetails - The user details to be registered.
   * @returns {Observable<any>} An observable representing the registration response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // -2- User login
  /**
   * Login a user.
   *
   * This method sends a POST request to log in a user with the provided details.
   *
   * @param {Object} userDetails - The user details for login.
   * @returns {Observable<any>} An observable representing the login response.
   */
  userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // -3- Get all movies
  /**
   * Get all movies from the server.
   *
   * This method sends a GET request to fetch a list of all movies from the server.
   *
   * @returns {Observable<any>} An observable that represents the list of movies.
   */
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

  // -4- Get a single movie by title
  /**
   * Get movie details by title.
   *
   * This method sends a GET request to retrieve movie details by title.
   *
   * @param {string} title - The title of the movie to retrieve.
   * @returns {Observable<any>} An observable that represents the movie details.
   */
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

  // -5- Get a director by name
  /**
   * Get movie director information by name.
   *
   * This method sends a GET request to retrieve information about a movie director by their name.
   *
   * @param {string} name - The name of the movie director to retrieve information for.
   * @returns {Observable<any>} An observable that represents the director information response.
   */
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

  // -6- Get a genre by name
  /**
   * Get movies by genre.
   *
   * This method sends a GET request to retrieve movies that belong to a specific genre.
   *
   * @param {string} name - The name of the genre to filter movies.
   * @returns {Observable<any>} An observable that represents the response containing movies of the specified genre.
   *
   * @param {string} name - The name of the genre to filter movies.
   */
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

  // -7- Get user by username
  /**
   * Get user details for the currently logged-in user.
   *
   * This method retrieves user details for the user currently logged in.
   *
   * @returns {Observable<any>} An observable that represents the user details response.
   */
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

  // -8- Get favorite movies for a user  
  /**
   * Get a user's favorite movies.
   *
   * This method retrieves a user's favorite movies based on the user's credentials.
   *
   * @returns {Observable<any>} An observable that represents the user's favorite movies.
   */
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

  // -9- Add a movie to the user's favorites
  /**
   * Add a movie to the user's list of favorite movies.
   *
   * This method adds a movie with the specified ID to the user's list of favorite movies.
   *
   * @param {string} movieId - The ID of the movie to add to the favorites.
   * @returns {Observable<any>} An observable representing the response after adding the movie to favorites.
   */
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

  // -10- Delete a movie from favorite movies
  /**
   * Delete a movie from the user's list of favorite movies.
   *
   * This method deletes a movie from the user's list of favorite movies by sending a DELETE request.
   *
   * @param {string} movieId - The ID of the movie to be removed from favorites.
   * @returns {Observable<any>} An observable representing the response after removing the movie from favorites.
   */
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

  // -11- Edit user info
  /**
   * Edit user details for the currently logged-in user.
   *
   * This method updates user details for the currently logged-in user using an HTTP PUT request.
   *
   * @param {Object} userData - The updated user details.
   * @returns {Observable<any>} An observable representing the response from the server after the update.
   */
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

  // -12- Delete user
  /**
   * Delete a user by their username.
   *
   * This method sends a DELETE request to delete a user with the specified username.
   *
   * @param {string} username - The username of the user to be deleted.
   * @returns {Observable<any>} An observable that represents the deletion response.
   */
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