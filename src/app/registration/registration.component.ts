import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  //to hold registration error message
regErrorMsg:string='';

regSuccessMsg:string='';
    constructor(private registerFB:FormBuilder,private api:ApiService,private router:Router ){}

    // for group
registerForm=this.registerFB.group({
   // for array - this we type to get the username , acno and password in correct form
   username:['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
   acno:['',[ Validators.required, Validators.pattern('[0-9]*')]],
   password:['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
})
//control passes to html

register(){
  if(this.registerForm.valid){
  let uname=this.registerForm.value.username;
  let acno=this.registerForm.value.acno;
  let password=this.registerForm.value.password; 

    this.api.register(acno,uname,password).subscribe((result:any)=>{
      // console.log(result);
      alert(result.message);
      this.regSuccessMsg=result.message;
      setTimeout(()=>{
        this.router.navigateByUrl('/login')
      },2000)   
         
    },
    (result:any)=>{
      //error message
      this.regErrorMsg=result.error.message
      
    setTimeout(()=>{
      this.registerForm.reset()
      this.regErrorMsg=""
    },2000)

    }
    )

  // alert('Register Success')
  }
  else{
  alert(' Invalid Register Form')
  }
}
  }


  