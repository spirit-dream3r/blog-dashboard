import { Component, OnInit, inject } from '@angular/core';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent{

  
  onSubmit(data: any) {
    let category = { category: data.value.category };
   }


}
