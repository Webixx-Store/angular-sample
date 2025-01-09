import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-register',
  templateUrl: './register-catelogy.component.html',
  styleUrls: ['./register-catelogy.component.css']
})
export class RegisterCategoryComponent implements OnInit {
  categoryForm: FormGroup = {} as FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
      parentCategory: [''],
      status: ['active'],
      imageUrl: [''],
      displayOrder: ['', [Validators.required, Validators.min(0)]]
    });
  }

  // Getter để dễ dàng truy cập form controls trong template
  get f() {
    return this.categoryForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.categoryForm.valid) {
      console.log(this.categoryForm.value);
      // Add your API call here
    }
  }

  // Trong component class thêm method này
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.categoryForm.patchValue({
        imageUrl: file
      });
    }
  }
}
