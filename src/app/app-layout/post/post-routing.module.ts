import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostFormComponent } from './post-form/post-form.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

const routes: Routes = [
  {path:'blog-edit' , component:PostFormComponent} ,
  {path:'blog-detail' , component:PostDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
