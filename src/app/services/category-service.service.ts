import { Injectable, inject } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Category } from '../models/category.interface';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private dbPath = '/Categories'
  categoriesRef: AngularFirestoreCollection<Category>


  constructor(private db: AngularFirestore, private _snackBar: MatSnackBar) {
    this.categoriesRef = db.collection(this.dbPath);
   }

   getAll(): AngularFirestoreCollection<Category> {
    return this.categoriesRef;
  }

  create(category: Category): any {
    return this.categoriesRef.add({ ...category });
  }

  saveData(data){
    this.db.collection(this.dbPath).add(data).then(docRef =>{
      //console.log(docRef)
      this._snackBar.open('Successfully added!')
    })
    .catch(err => console.log(err))
  }
}
