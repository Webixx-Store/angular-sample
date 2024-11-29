import { Component, OnInit } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'; // Sử dụng ClassicEditor
import '@ckeditor/ckeditor5-alignment/build/translations/vi';
import { BlogModel } from 'src/app/model/blog.model';
import { environment } from 'src/environments/environment';

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  ngOnInit(): void {}

  public Editor = DecoupledEditor as any;
  blog: BlogModel = {} as BlogModel;

  public editorConfig = {
    toolbar: {
      items: [
        'heading',
        '|',
        'fontFamily',
        'fontSize',
        '|',
        'fontColor',
        'fontBackgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        '|',
        'alignment', // Đảm bảo rằng tùy chọn căn chỉnh có ở đây
        'indent',
        'outdent',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'link',
        'imageUpload',
        'blockQuote',
        'insertTable',
        '|',
        'undo',
        'redo'
      ]
    },
    image: {
      upload: {
        types: ['jpeg', 'png', 'gif', 'jpg']
      }
    },
    ckfinder: {
      uploadUrl: environment.apiUrl + '/api/products/upload-editor',
    },
    fontFamily: {
      options: [
        'default',
        'Arial',
        'Times New Roman',
        'Helvetica',
        'Courier New',
        'Roboto'
      ]
    },
    fontSize: {
      options: [
        9,
        11,
        13,
        'default',
        17,
        19,
        21
      ]
    },
    alignment: {
      options: ['left', 'right', 'center', 'justify'] // Đảm bảo bạn có các tùy chọn căn chỉnh
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties'
      ]
    }
  };

  submitForm() {
    console.log('Dữ liệu bài viết:', this.blog);
    alert('Bài viết đã được gửi!');
  }

  onReady(editor: any): void {
    const toolbarElement = editor.ui.view.toolbar.element;
    const editableElement = editor.ui.getEditableElement();

    // Thêm toolbar vào DOM
    editableElement.parentElement.insertBefore(toolbarElement, editableElement);
  }
}


