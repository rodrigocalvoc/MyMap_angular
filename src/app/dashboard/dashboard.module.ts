import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { MyCountriesComponent } from './pages/my-countries/my-countries.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RandomCountryComponent } from './pages/random-country/random-country.component';
import { CapitalInfoComponent } from './pages/capital-info/capital-info.component';
import { CurrencyInfoComponent } from './pages/currency-info/currency-info.component';
import { PopulationInfoComponent } from './pages/population-info/population-info.component';
import { FlagInfoComponent } from './pages/flag-info/flag-info.component';




@NgModule({
  declarations: [
    DashboardLayoutComponent,
    MyCountriesComponent,
    WelcomeComponent,
    RandomCountryComponent,
    CapitalInfoComponent,
    CurrencyInfoComponent,
    PopulationInfoComponent,
    FlagInfoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule
  ],




})
export class DashboardModule { }
