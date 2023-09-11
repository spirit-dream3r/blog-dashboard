import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoryService } from '../services/category-service.service';
import { Category } from '../models/category.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  categoryArray: Array<any>;
  isDisabled: boolean = true;
  formCategory: string;

  categoryService: CategoryService = inject(CategoryService);
  _snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((val) => {
      console.log(val);
      this.categoryArray = val;
    });
  }

  onSubmit(formData: any): void {
    let categoryData: Category = {
      category: formData.value.category,
    };

    this.categoryService.saveData(categoryData);
    formData.reset();
    this.isDisabled ? formData.value.category === '' : false;
    this._snackBar.open(
      'Successfully added!' + ' ' + categoryData.category,
      'x'
    );
  }

  onDelete(id: string) {
    this.categoryService.delete(id).then(() => {
      this._snackBar.open('Successfully deleted', 'X');
    });
  }

  onEdit(category) {
    this.formCategory = category;
  }
}
