import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { CategoryService } from '../services/category-service.service';
import { Category } from '../models/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  categories?: Category[];

  categoryService: CategoryService = inject(CategoryService);

  constructor() {
    this.retrieveCategories();
  }

  onSubmit(formData: any): void {
    let categoryData: Category = {
      category: formData.value.category,
    };
    this.categoryService.saveData(categoryData);
  }

  retrieveCategories(): void {
    this.categoryService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc['id'],
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.categories = data;
        console.log(this.categories);
      });
  }
}
