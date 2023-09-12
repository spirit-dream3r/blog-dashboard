import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.interface';
import { CategoryService } from 'src/app/services/category-service.service';
import { PostService } from 'src/app/services/post-service.service';

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
  disabled: boolean = true;

  categoryService: CategoryService = inject(CategoryService);
  fb: FormBuilder = inject(FormBuilder)
  postService: PostService = inject(PostService)

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

  onSubmit(){

    let splitted = this.postForm.value.category.split('-')

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      excerpt: this.postForm.value.excerpt,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      imgSrc:'',
      status: 'new',
      content:this.postForm.value.content,
      isFeatured: false,
      views: 0,
      createdAt: new Date()
    }

    console.log(postData)
  }

}
