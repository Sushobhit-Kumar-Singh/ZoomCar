import { Component } from '@angular/core';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'car';

  registerObj: any ={
    
      "userId": 0,
      "name": "",
      "userRole": "",
      "emailId": "",
      "mobileNo": "",
      "password": "",
      "createdOn": new Date()
    
  };
  loginObj: any ={
    
    "userId": 0,
    "name": "aaa",
    "userRole": "111",
    "emailId": "",
    "mobileNo": "111",
    "password": "",
    "createdOn": new Date()
  
};

  loggedUserObj:any;
  constructor(private carSrv: CarService){

    const local = localStorage.getItem('zoomUser');
    if(local != null){
      this.loggedUserObj = JSON.parse(local);
    }

  }
  onRegister(){
    debugger;
    this.carSrv.registerUser(this.registerObj).subscribe((res:any)=>{
      if(res.result){
        alert('Registration Success')
        this.closeRegister();
        this.loggedUserObj = res.data;
      }else{
        alert(res.message)
      }
    })
  }
  openRegister(){
    const model = document.getElementById('registerModal');
    if(model != null){
      model.style.display='block'
    }
  }
  closeRegister(){
    const model = document.getElementById('registerModal');
    if(model != null){
      model.style.display='none'
    }
  }
  onLogin(){
    this.carSrv.loginUser(this.loginObj).subscribe((res:any)=>{
      if(res.result){
        alert('Login Success')
        localStorage.setItem('zoomUser',JSON.stringify(res.data))
        this.loggedUserObj = res.data; 
        this.closeLogin();

      }else{
        alert(res.message)
      }
    })
  }
  logout(){
    localStorage.removeItem('zoomUser');
    this.loggedUserObj =undefined;
  }
  openLogin(){
    const model = document.getElementById('loginModal');
    if(model != null){
      model.style.display='block'
    }
  }
  closeLogin(){
    const model = document.getElementById('loginModal');
    if(model != null){
      model.style.display='none'
    }
  }
}

