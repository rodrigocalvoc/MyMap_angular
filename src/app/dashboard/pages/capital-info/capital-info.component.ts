import { CountryInput } from './../models/countriesInput.model';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DataService } from '../../services/data.service';
import { map } from 'rxjs';
import { CountriesApiResponse } from '../models/countriesApiResponse.models';
import { CountrySearch } from '../models/countriesSearch.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-capital-info',
  templateUrl: './capital-info.component.html',
  styleUrls: ['./capital-info.component.css']
})
export class CapitalInfoComponent implements OnInit {


  ngOnInit(): void {
    this.getAllCountries();
  }


  private dataService = inject (DataService);

  public keyword = 'name';
  public data: CountryInput[] = []  ;
  public info: CountrySearch[] = []  ;
  public input: CountryInput = {
    id: 0,
    latLng: [0,0],
    name: '',
    liked: false,
    oficialName: '',
  };

  public countrySearched: CountrySearch = {
    id: 0,
    name: '',
    oficialName: '',
    population: 0,
    capital: '',
    cryptocurrency: '',
    flag: '',
  };



  public capital = '';






  private getAllCountries(): void{

    this.dataService.getAllCountries().pipe(
      map(response => response.map((item: CountriesApiResponse, index:number) => ({id: index +1 , name: item.translations['spa'].common , latLng: item.latlng, oficialName: item.translations['spa'].official})))
    ).subscribe((countriesInput: CountryInput[]) => {
      this.data = countriesInput;
    });

      }


      searchButton(): void{


     if(!this.input.id){
      Swal.fire({
        title: "El país no existe",
        icon: "error"
      });

    }


        this.dataService.searchCountry(this.input.oficialName).pipe(
          map(response => response.map((item: CountriesApiResponse, index:number) => ({id: index +1 , name: item.translations['spa'].common , oficialName: item.translations['spa'].official, population: item.population, capital: item.capital, cryptocurrency: item.currencies})))
        ).subscribe((countriesSearch: CountrySearch[]) => {
          this.info = countriesSearch;
          this.capital = this.info[0].capital;
        });



      }



}

