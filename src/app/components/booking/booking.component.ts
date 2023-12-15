import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent {
  carId: string ='';
  locationId: string ='';
  carDetails: any;
  bookingObj:any={
  
    "bookingId": 0,
    "customerId": 0,
    "fromLocationId": 0,
    "toLocationId": 0,
    "travelDate": "2023-12-14T12:25:14.308Z",
    "startTime": "",
    "carId": this.carId,
    "pickupAddress": "",
    "alternateContactNo": "",
    "invoiceNo": "",
    "isComplete": true
  };
  
  locations: any [] = [];
  loggedUserObj: any;

  constructor(private activateRoute:ActivatedRoute,private carSrv: CarService){
      this.getAllLocations();
    this.activateRoute.params.subscribe((res:any)=>{
      this.carId = res.carId;
      this.locationId = res.locationId;
      this.getCarDetails();
      this.bookingObj.carId = this.carId;

    })
    const local = localStorage.getItem('zoomUser');
    if(local != null){
      this.loggedUserObj = JSON.parse(local);
      this.bookingObj.customerId = this.loggedUserObj.userId;
    }
  }
  getAllLocations(){
    this.carSrv.GetAllLocations().subscribe((res:any)=>{
      this.locations = res.data;

    })
  }
  getCarDetails(){
    this.carSrv.GetCarById(this.carId).subscribe((res:any)=>{
      this.carDetails =res.data;
    })
  }
  createBooking(){
    this.carSrv.createNewBooking(this.bookingObj).subscribe((res:any)=>{
      if(res.result){
        alert("Booking Success")
      }else{
        alert(res.message)
      }
    })

  }


}
