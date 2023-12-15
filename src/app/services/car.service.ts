import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  apiEndPoint: string ='https://freeapi.miniprojectideas.com/api/ZoomCar/';
  // Swagger Ui : https://freeapi.miniprojectideas.com/index.html

  constructor(private http:HttpClient) { }

  registerUser(obj:any){
    debugger;
    return this.http.post(this.apiEndPoint + 'AddNewUser',obj);
  }
  loginUser(obj:any){
    debugger;
    return this.http.post(this.apiEndPoint + 'Login',obj);
  }
  addNewCar(obj:any){
    debugger;
    return this.http.post(this.apiEndPoint + 'addNewCar',obj);
  }
  GetAllLocations(){
    return this.http.get(this.apiEndPoint  + "GetAllLocations")
  }
  GetAllCarsByOwnerId(userId : number){
    return this.http.get(this.apiEndPoint + "GetAllCarsByOwnerId?id=" + userId)
  }
  GetAllCars(){
    return this.http.get(this.apiEndPoint +'GetAllCars')
  }
  GetAllCarsByLocation(locationId : string){
    return this.http.get(this.apiEndPoint + "GetAllCarsByLocation?id=" + locationId)
  }
  GetCarById(carId : string){
    return this.http.get(this.apiEndPoint + "GetCarById?id=" + carId)
  }
  createNewBooking(obj:any){
    debugger;
    return this.http.post(this.apiEndPoint + 'createNewBooking',obj);
  }
}
