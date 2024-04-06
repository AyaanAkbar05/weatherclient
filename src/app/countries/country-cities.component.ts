import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CountryCities } from './country-cities';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-country-cities',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './country-cities.component.html',
  styleUrl: './country-cities.component.css'
})
export class CountryCitiesComponent {
  public countryCities: CountryCities[] = [];
  public displayedColumns : string[]= ["cityId", "name", "latitude", "longitude"];
  id:number;
  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    this.id= -1;
  }
  ngOnInit() {
    this.getCities();
  }
  getCities() {
    let idparam= this.activatedRoute.snapshot.paramMap.get("id");
    this.id= idparam? + idparam:-1;
    this.http.get<CountryCities[]>(`${environment.baseurl}api/Countries/CountryCities/${this.id}`).subscribe(
      {
        
        next: result => this.countryCities= result,
        error: error => console.error(error) 
      }
    );
  }
}
