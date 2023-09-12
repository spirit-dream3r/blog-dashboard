import { Injectable, inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class PostService{

  afs: AngularFireStorage = inject(AngularFireStorage);
 

  constructor() { } 

  uploadImg(data):void {
    const imgPath = `images/${Date.now()}`;
    console.log(imgPath);
  }
}
