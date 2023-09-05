import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import firebase from  'firebase/compat/app';
import {addDoc, collection, getFirestore} from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  async createCategory(db: any){
    try {
      const docRef = await addDoc(collection(db, "categories"), {
        first: "Ada",
        last: "Lovelace",
        born: 1815
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
