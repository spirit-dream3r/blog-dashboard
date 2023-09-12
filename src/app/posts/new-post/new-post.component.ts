import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.interface';
import { CategoryService } from 'src/app/services/category-service.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit{
  permalink: string = '';
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;
  categories: Array<any>
  postForm: FormGroup;

  categoryService: CategoryService = inject(CategoryService);
  fb: FormBuilder = inject(FormBuilder)

  constructor(){
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      permalink: ['', Validators.required],
      excerpt: ['', [Validators.required,Validators.minLength(20)]],
      category: ['', Validators.required],
      postImg: ['', Validators.required],
      content: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(val => {
      this.categories = val;
    })
  }

  get fc(){
    return this.postForm.controls;
  }

  onTitleChanged($event){
    const title = $event.target.value;
    this.permalink = title.replace(/\s/g, '-')
  }

  showPreview($event){
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result
    }
    reader.readAsDataURL($event.target.files[0])
    this.selectedImg = $event.target.files[0];
  }

}
