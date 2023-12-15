import { Component ,OnInit} from '@angular/core';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit{
  loggedUserObj: any
  carList: any[] = [];
  locations: any[] = [];

  carAccessoriessObj: any = {
    
      "accessoriesId": 0,
      "accessoriesTitle": "",
      "showOnWebsite": false,
      "carId": 0
    
  };

  carObj: any = {
    
      "carId": 0,
      "brand": "",
      "name": "",
      "pricingDescription": "",
      "pricing": 0,
      "locationId": 0,
      "registeredOn": "2023-12-13T09:50:23.196Z",
      "imageUrl": "",
      "vehicleNo": "",
      "ownerUserId": 0,
      "ZoomCarAccessoriess": [
        
      ]
    
  }

  constructor(private carSrv: CarService){
    const local = localStorage.getItem('zoomUser');
    if(local != null){
      this.loggedUserObj = JSON.parse(local);
    }
  }
  ngOnInit(): void {
    this.getCars();
    this.GetAllLocations();
  }
  Add(){
    const obj = JSON.stringify(this.carAccessoriessObj);
    this.carObj.ZoomCarAccessoriess.push(JSON.parse(obj));
    this.carAccessoriessObj = {
    
      "accessoriesId": 0,
      "accessoriesTitle": "",
      "showOnWebsite": false,
      "carId": 0
    
  };
  }
  getCars(){
    this.carSrv.GetAllCarsByOwnerId(this.loggedUserObj.userId).subscribe((res:any)=>{
      this.carList = res.data;
    })
  }
  GetAllLocations(){
    this.carSrv.GetAllLocations().subscribe((res:any)=>{
      this.locations = res.data;
    })
  }
  open(){
    const model = document.getElementById('newCarModal');
    if(model != null){
      model.style.display='block'
    }
  }
  close(){
    const model = document.getElementById('newCarModal');
    if(model != null){
      model.style.display='none'
    }
  }
  saveCar(){
    this.carObj.ownerUserId = this.loggedUserObj.userId;

    debugger;
    this.carSrv.addNewCar(this.carObj).subscribe((res:any)=>{
      if(res.result){
        alert('Car Created');
        this.getCars();
        this.close();
        this.carObj= {
    
          "carId": 0,
          "brand": "",
          "name": "",
          "pricingDescription": "",
          "pricing": 0,
          "locationId": 0,
          "registeredOn": "2023-12-13T09:50:23.196Z",
          "imageUrl": "",
          "vehicleNo": "",
          "ownerUserId": 0,
          "ZoomCarAccessoriess": [
            
          ]
        
      }
      }else{
        alert(res.message)
      }
    })
  }
}
