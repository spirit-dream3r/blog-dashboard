import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { CategoryComponent } from '../category/category.component';

@Component({
  selector: 'app-snack-show',
  templateUrl: './snack-show.component.html',
  styleUrls: ['./snack-show.component.css']
})
export class SnackShowComponent {
  durationInSeconds = 5;
  snackBarRef = inject(MatSnackBarRef)

  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(CategoryComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

