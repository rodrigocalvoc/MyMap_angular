import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { CountryInput } from '../models/countriesInput.model';
import { CountrySearch } from '../models/countriesSearch.model';
import { CountriesApiResponse } from '../models/countriesApiResponse.models';
import { map } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-currency-info',
  templateUrl: './currency-info.component.html',
  styleUrls: ['./currency-info.component.css']
})
export class CurrencyInfoComponent {




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



  public divisa = '';






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
          map(response => response.map((item: CountriesApiResponse, index:number) => ({id: index +1 , name: item.translations['spa'].common , oficialName: item.translations['spa'].official, population: item.population, capital: item.capital, cryptocurrency: item.currencies ? Object.values(item.currencies)[0].name : ''})))
        ).subscribe((countriesSearch: CountrySearch[]) => {
          this.info = countriesSearch;
          this.divisa = this.info[0].cryptocurrency;
        });



      }

}
