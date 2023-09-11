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
  formStatus: string = 'Add';
  categoryId: string;

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
    if(this.formStatus === 'Add'){
      this.categoryService.saveData(categoryData);
      formData.reset();
  
      this._snackBar.open(
        'Successfully added!' + ' ' + categoryData.category,
        'x'
      );
    } else if (this.formStatus === 'Edit'){
      this.categoryService.updateData(this.categoryId, categoryData)
    }

  }

  onDelete(id: string) {
    this.categoryService.delete(id).then(() => {
      this._snackBar.open('Successfully deleted', 'X');
    });
  }

  onEdit(category, id) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;

  }
}
