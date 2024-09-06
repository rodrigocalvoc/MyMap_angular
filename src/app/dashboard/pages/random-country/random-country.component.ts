import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CountryInput } from '../models/countriesInput.model';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs';
import { CountriesApiResponse } from '../models/countriesApiResponse.models';
import { latLng } from 'leaflet';

@Component({
  templateUrl: './random-country.component.html',
  styleUrls: ['./random-country.component.css']
})
export class RandomCountryComponent implements OnInit {


  ngOnInit(): void {
    this.getAllCountries();
  }

  private authService = inject( AuthService );
  private dataService = inject (DataService);


  public user = computed(() => this.authService.currentUser() );
  userCountries:CountryInput[]  = this.user()?.countries!;

  public numberOfCountries = 0;
  public randomIndex = 0;
  public randomCounty: CountryInput = {
    id: 0,
    latLng: [0,0],
    name: '',
    liked: false,
    oficialName: '',

  }

  public data: CountryInput[] = []  ;
  public countryName: string ="";



  private getAllCountries(): void{





    this.dataService.getAllCountries().pipe(
      map(response => response.map((item: CountriesApiResponse, index:number) => ({id: index +1 , name: item.translations['spa'].common , latLng: item.latlng})))
    ).subscribe((countriesInput: CountryInput[]) => {
      this.data = countriesInput;

    });




      }








  getRandomCountry():void{

    this.data = this.data.filter(country => !this.userCountries.find(uc => uc.id === country.id));

    this.numberOfCountries = this.data.length;
    this.randomIndex = Math.floor(Math.random() * this.numberOfCountries);
    this.randomCounty = this.data[this.randomIndex];
    this.countryName = this.randomCounty.name;




  }
}
