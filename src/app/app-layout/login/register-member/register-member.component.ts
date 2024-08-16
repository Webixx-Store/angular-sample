import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { State, Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { addUser } from 'src/app/actions/auth.action';
import { Common } from 'src/app/common/constant/common';
import { ValidationUtil } from 'src/app/common/util/validation.util';
import { ResultModel } from 'src/app/model/result.model';
import { AuthState, getResultSaveUser } from 'src/app/selectors/auth.selector';

@Component({
  selector: 'app-register-member',
  templateUrl: './register-member.component.html',
  styleUrls: ['./register-member.component.css']
})
export class RegisterMemberComponent implements OnInit {

  googleID:string = "";
  googleUser:any =  JSON.parse(localStorage.getItem(Common.GOOGLE_USER) || '{}');
  result$ = new Observable<ResultModel>();
  result: ResultModel = {} as ResultModel;
  userForm = this.fb.group({
		username: [''],
		email: [''],
		password: [''],
		rePassword: [''],
	});
  constructor(private fb: FormBuilder ,
              private authState : Store<AuthState> ,private toastr: ToastrService) {
                this.result$ = authState.select(getResultSaveUser);
              }
  ngOnInit(): void {
    if(!ValidationUtil.isNotNullAndNotEmpty(this.googleUser)){
      location.href = "/"
    }else{
      this.userForm.patchValue({
        email:this.googleUser.email,
        username:this.googleUser.name
      })
      this.userForm.get('email')?.disable();
    }

    this.result$.subscribe(res=>{
      if(ValidationUtil.isNotNullAndNotEmpty(res.retCode)){
          alert(res.retStr);

      }
    })

  }

  addUser(){
    if(!ValidationUtil.isNotNullAndNotEmpty(this.userForm.get('username')?.value)){
      alert('please enter username')
      return;
    }
    if(!ValidationUtil.isNotNullAndNotEmpty(this.userForm.get('password')?.value)){
      alert('please enter password')
      return;
    }
    console.log(this.userForm.get('password')?.value)
    console.log(this.userForm.get('rePassword')?.value)
    if(this.userForm.get('password')?.value != this.userForm.get('rePassword')?.value){
      this.toastr.error("Passwords do not match, please enter correctly")
      return;
    }
    let params = {
      username : this.userForm.get('username')?.value,
      password : this.userForm.get('password')?.value,
      email : this.userForm.get('email')?.value,
      googleID:this.googleUser.sub
    }

    this.authState.dispatch(addUser({params:params}));
  }



}
