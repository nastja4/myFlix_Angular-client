import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { DirectorInfoComponent } from '../director-info/director-info.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  @Input() movie: any;
  

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getMovies();    
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
  
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: title, 
        description: description 
      }
    });
  }

  openDirectorDialog(director: any): void {
    this.dialog.open(DirectorInfoComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      }
    })
  }
    
  openGenreDialog(genre: any): void {
    this.dialog.open(GenreInfoComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      }
    })
  }



  isFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.isFavorite(movieId)) {
      // Remove the movie from favorites
      this.removeFromFavorites(movieId);
    } else {
      // Add the movie to favorites
      this.addToFavorites(movieId);
    }
  }


  addToFavorites(movieId: string): void {
    this.fetchApiData.addMovieToFavorites(movieId).subscribe((data: any) => {
      // Handle the response after adding the movie to favorites
      console.log(data);
      this.favoriteMovies.push(movieId); // Update the list of favorite movies
    });
  }
  
  removeFromFavorites(movieId: string): void {
    this.fetchApiData.deleteMovieFromFavorites(movieId).subscribe((data: any) => {
      // Handle the response after removing the movie from favorites
      console.log(data);
      this.favoriteMovies = this.favoriteMovies.filter((id) => id !== movieId); // Update the list of favorite movies
    });
  }
}

 