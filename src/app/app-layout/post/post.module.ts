import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';
import { PostFormComponent } from './post-form/post-form.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [PostFormComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    ComponentsModule,
    CKEditorModule,
    FormsModule
  ]
})
export class PostModule { }
