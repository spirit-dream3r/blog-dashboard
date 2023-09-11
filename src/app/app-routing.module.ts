import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { AllPostsComponent } from './posts/all-posts/all-posts.component';
import { NewPostComponent } from './posts/new-post/new-post.component';

const routes: Routes = [
  {path:'', component: DashboardComponent},
  {path: 'category', component: CategoryComponent},

  {path: 'posts', component: AllPostsComponent},
  {path: 'posts/new', component: NewPostComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
