import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';

import { ComponentsModule } from 'src/app/components/components.module';
import { PostFormComponent } from './post-form/post-form.component';
@NgModule({
  declarations: [PostFormComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    ComponentsModule
  ]
})
export class PostModule { }
