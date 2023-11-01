import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit{
  user: any = {};
  favoriteMovies: any[] = [];
  movies: any[] = []; // New array to store all movies 

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,   
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
  ) { } 

  //  (method) It is automatically called (calling two functions) by Angular after the component is initialized.
  ngOnInit(): void {
    this.getUserProfile();  // fetching and setting the user's profile data
    this.getMovies();  // fetch all movies
    this.getFavorites();
  }


  getUserProfile(): void {
    this.fetchApiData.getOneUser().subscribe((result: any) => {
      this.user = result;
      this.userData = { ...this.user };
      this.favoriteMovies = this.user.FavoriteMovies || [];
    });
  }
  
  updateUserProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (response: any) => {        
        this.userData = response;
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000
        });
      },
      error: (error) => {  
        console.error('Profile update failed:', error);
        this.snackBar.open('Profile update failed. Please try again.', 'OK', {
          duration: 2000
        });
      },
    });
  } 

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your profile?')) {
      this.fetchApiData.deleteUser(this.user.Username).subscribe(() => {
        this.snackBar.open('Account deleted successfully!', 'OK', {
          duration: 2000
        });
        localStorage.clear();
        this.router.navigate(['welcome']);
      });
    }
  }

  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    })
  }
  
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      }
    })
  }
  
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailsDialogComponent, {
      data: {
        title: "Description", 
        content: synopsis, 
      }
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (data: any) => {
        this.movies = data;
      },
      error: (error: any) => {
        console.error('Error fetching movies: ', error);
      },
    });
  }
  
  getFavorites(): any[] {
    // Filter the favorite movies and get their details
    return this.movies
    .filter((movie) => this.favoriteMovies.includes(movie._id));    
  }  

  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }
  
  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      this.removeFromFavorites(movieId);
    } else {
      this.addToFavorites(movieId);
    }
  }
  
  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteMovieFromFavorites(movieId).subscribe((data: any) => {
      this.favoriteMovies = this.favoriteMovies.filter((id) => id !== movieId); // Update the list of favorite movies
    });
  }

  addToFavorites(movieId: string): void {
    this.fetchApiData.addMovieToFavorites(movieId).subscribe((data: any) => {
      this.favoriteMovies.push(movieId); // Update the list of favorite movies
    });
  }  
}
