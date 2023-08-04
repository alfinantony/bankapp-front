import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// for over loading
const options={
  headers:new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  register(acno:any,username:any,password:any){
    
    const body={
      acno,
      username,
      password
    }
    return this.http.post('http://localhost:5000/register',body)
  }

  login(acno:any,password:any){
    
    const body={
      acno,
      password
    }
    return this.http.post('http://localhost:5000/login',body)
  }


  //append token to the request headers

  appendToken(){
    // get token  from local storage
    let token=localStorage.getItem('token');
    //create http header
    let headers=new HttpHeaders()//class
    if(token){
      headers=headers.append('verify-token', token)
      options.headers=headers
    }
    return options
  }

  //api call
  getBalance(acno:any){
    return this.http.get('http://localhost:5000/balance/' +acno, this.appendToken())
  }

  //api call for fund transfer

  fundTransfer(toAcno:any, password:any, amount:any){
    const body={
      toAcno,
      password,
      amount
    }
    return this.http.post('http://localhost:5000/fund-transfer', body,this.appendToken())
  }

  //api call for get transaction

  getTransaction(){
    return this.http.get('http://localhost:5000/get-transaction',this.appendToken())
  }

  //api call for delete account

  deleteAccount(){
    return this.http.delete('http://localhost:5000/delete-account',this.appendToken())
  }
}
