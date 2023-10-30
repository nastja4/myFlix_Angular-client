import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit{
  user: any = {};
  favoriteMovies: any[] = [];

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,   
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,
  ) { } 

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.fetchApiData.getOneUser().subscribe((result: any) => {
      this.user = result;
      this.userData.Username = this.user.Username;
      this.userData.Email = this.user.Email;
      this.userData.Birthday = this.user.Birthday;
      if (this.user.FavoriteMovies) {
        this.favoriteMovies = this.user.FavoriteMovies;
      }     
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
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['welcome']);
      });
    }
  }
}
