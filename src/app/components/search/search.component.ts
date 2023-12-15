import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  locationId: string = '';
  locations: any [] = [];
  fromLocation: string ='';
  toLocation: string ='';
  availabelCars: any [] = [];

  constructor(private activateRoute: ActivatedRoute,private carSrv :CarService,private router: Router){
    this.activateRoute.params.subscribe(res=>{
      debugger;
      this.locationId = res['locationId'];
      this.fromLocation = this.locationId;
      this.getCarsFromLocations();
    })
  }
  ngOnInit(): void {
    this.getAllLocations();
  }
  getAllLocations(){
    this.carSrv.GetAllLocations().subscribe((res:any)=>{
      this.locations = res.data;

    })
  }
  getCarsFromLocations(){
    this.carSrv.GetAllCarsByLocation(this.locationId).subscribe((res:any)=>{
      this.availabelCars = res.data;

    })
  }
  onLocationChange(){
    this.carSrv.GetAllCarsByLocation(this.fromLocation).subscribe((res:any)=>{
      this.availabelCars = res.data;

    })
  }
  makeBooking(carId: number){
    this.router.navigate(['/booking',this.fromLocation,carId])
  }
}
