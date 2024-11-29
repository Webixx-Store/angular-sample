import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';
import { PostFormComponent } from './post-form/post-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { PostDetailComponent } from './post-detail/post-detail.component';
@NgModule({
  declarations: [PostFormComponent, PostDetailComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    ComponentsModule,
    CKEditorModule,
    FormsModule
  ]
})
export class PostModule { }
