import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Category } from '../models/category.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private dbPath = '/Categories';
  categoriesRef: AngularFirestoreCollection<Category>;
  categories?: Category[];

  constructor(private db: AngularFirestore) {
    this.categoriesRef = db.collection(this.dbPath);
  }

  getAll() {
    return this.db
      .collection(this.dbPath)
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((c) => {
            const id = c.payload.doc.id;
            const data = c.payload.doc.data();
            return { id, data };
          });
        })
      );
  }

  create(category: Category): any {
    return this.categoriesRef.add({ ...category });
  }

  saveData(data: any) {
    this.db
      .collection(this.dbPath)
      .add(data)
      .catch((err) => console.log(err));
  }

  delete(id: string):Promise<void>{
    return this.categoriesRef.doc(id).delete();
  }
}
