import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

// to hold delete status
  deleteConfirmStatus: boolean=false;

// to pass a value to the component (for delete purpose)
acno:any;

  //to hold logout status
  logoutStatus: boolean=false;

// to hold the username from local storage
  user:string=""  

  // to hold the current Acno from local storage
  currrentAcno:any
  
  //to assign balance
  balance:any


  //to hold success message
  transferSuccessMessage:string='';

  //to hold error message
  transferErrorMessage:string='';

    isCollaps:boolean =true;
    
    constructor(private Fb:FormBuilder,private api:ApiService,private dashboardRoute:Router){}


    FundTransfer=this.Fb.group({
      creditAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
      password:['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
    })

    ngOnInit(): void {

      //logout error
      if(!localStorage.getItem('token')){
        alert('Please Login First')
        // this.logout()
        this.dashboardRoute.navigateByUrl('')
      }


      //to get the username form local storage
      if(localStorage.getItem('currentUser')){
      this.user=localStorage.getItem('currentUser')||""
      }

      //to get current Acno from local storage
      if(localStorage.getItem('currentAcno')){
        this.currrentAcno=localStorage.getItem('currentAcno')||""
      }
    }

    collaps(){
      this.isCollaps=!this.isCollaps
    }

    getBalance(){
      this.api.getBalance(this.currrentAcno).subscribe((result:any)=>{
      this.balance=result.balance;
      console.log(this.balance);
      
      },
      (result:any)=>{
        alert(result.error.message)
      }
      )
    }

    fundTransfer(){
      if(this.FundTransfer.valid){
        console.log(this.FundTransfer);
        //get details from fundTransfer form
        let creditAcno=this.FundTransfer.value.creditAcno
        let  password=this.FundTransfer.value.password
        let amount=this.FundTransfer.value.amount
        //api call 
        this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
          console.log(result); // out we get in console {statusCode: 200, message: 'Fund Transfer Successful.'}
          this.transferSuccessMessage=result.message 

          setTimeout(()=>{
            this.FundTransfer.reset()
            this.transferSuccessMessage=''
          },2000)
        },
        (result:any)=>{
          console.log(result.error.message);
          this.transferErrorMessage=result.error.message

          setTimeout(()=>{
            this.FundTransfer.reset()
            this.transferErrorMessage=''
          },2000)
        }
        )
      }
      else{
        alert("Invalid form")
      }
    }

    closeFundTransfer(){
      this.FundTransfer.reset()
      this.transferErrorMessage=''
      this.transferSuccessMessage=''
    }

    logout(){
      localStorage.clear() // remove all data from local storage
      

      // update logout status as true
      this.logoutStatus=true
      setTimeout(()=>{
        //navigate to the home page
        this.dashboardRoute.navigateByUrl('')
      },2000)
    }
 
    deleteAccount() {
      this.acno = localStorage.getItem('currentAcno')
      console.log(this.currrentAcno);
      this.deleteConfirmStatus=true
      
    }

    cancelDeleteConfirm(){
      this.acno=""
      this.deleteConfirmStatus=false

    }
    
    deleteAccountFromParent(){
      this.api.deleteAccount().subscribe((result:any)=>{
        //clear details from local storage
        localStorage.clear();
        alert(result.message);
        setTimeout(()=>{
          //redirected to login page
          this.dashboardRoute.navigateByUrl('')
        },2000)
      })
    }
}
