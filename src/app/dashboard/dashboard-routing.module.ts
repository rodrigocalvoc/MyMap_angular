import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { MyCountriesComponent } from './pages/my-countries/my-countries.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { RandomCountryComponent } from './pages/random-country/random-country.component';
import { CapitalInfoComponent } from './pages/capital-info/capital-info.component';
import { CurrencyInfoComponent } from './pages/currency-info/currency-info.component';
import { PopulationInfoComponent } from './pages/population-info/population-info.component';
import { FlagInfoComponent } from './pages/flag-info/flag-info.component';

const routes: Routes = [

  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
       {path: 'myCountries', component: MyCountriesComponent},
       {path: 'welcome', component: WelcomeComponent},
       {path: 'randomCountry', component: RandomCountryComponent},
       {path: 'capitalInfo', component: CapitalInfoComponent},
       {path: 'currencyInfo', component: CurrencyInfoComponent},
       {path: 'populationInfo', component: PopulationInfoComponent},
       {path: 'flagInfo', component: FlagInfoComponent},
       {path: '**', component: WelcomeComponent},
       {path: '', component: WelcomeComponent}

     ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
