import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-movie-details-dialog',
  templateUrl: './movie-details-dialog.component.html',
  styleUrls: ['./movie-details-dialog.component.scss']
})

export class MovieDetailsDialogComponent {
  title: string;
  content: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    // The 'data' property will contain the data passed to the dialog.
    this.title = data.title;
    this.content = data.content; 
  }
  
  
}
