import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {

  @Input()
  imageUrl: string | ArrayBuffer | null | undefined;

  @Output() changeFile = new EventEmitter<File>();

  

 

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.changeFile.emit(file);
    this.previewImage(file);
  }

  previewImage(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageUrl = reader.result;
    };
  }

  uploadImage() {
    console.log('Image uploaded:', this.imageUrl);
  }

  
}
