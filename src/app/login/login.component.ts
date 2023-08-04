import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginErrMsg: string='';
  loginSuccessMsg:Boolean=false; //for spinner if the login false
constructor(private loginFB:FormBuilder,private api:ApiService,private loginRouter:Router){}

loginForm=this.loginFB.group({
  acno:['',[ Validators.required, Validators.pattern('[0-9]*')]],
   password:['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
})

login(){
  if(this.loginForm.valid){
  let acno=this.loginForm.value.acno;
  let password=this.loginForm.value.password;
  this.api.login(acno,password).subscribe((result:any)=>{
    this.loginSuccessMsg=true; //for spinner if the login true

     // to store the current user in local storage
    localStorage.setItem('currentUser',result.currentUser)
    //to store token in local storage
    localStorage.setItem('token',result.token)
 // to store the current Acno in local storage
 localStorage.setItem('currentAcno',result.currentAcno)

    setTimeout(()=>{
 //redirected to dashboard - router
 this.loginRouter.navigateByUrl('/dashboard')
    },1000)
  },
  (result:any)=>{
    this.loginErrMsg=result.error.message;

    setTimeout(()=>{
      this.loginForm.reset()
      this.loginErrMsg=""
    },3000)
  }
  ) 
  
  }
  else{
  alert(' Invalid Login Form')
  }
}
}
