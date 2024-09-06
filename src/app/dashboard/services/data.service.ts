import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/interfaces';
import { CountryInput } from '../pages/models/countriesInput.model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private URL_API= 'https://restcountries.com/v3.1/all';
  private SEARCH_API = 'https://restcountries.com/v3.1/translation';
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }


  public getAllCountries(): Observable<any>{

    return this.http.get<any[]>(this.URL_API);

  }


  public searchCountry(country: string): Observable<any>{

    return this.http.get<any[]>(`${this.SEARCH_API}/${country}`);

  }



}
