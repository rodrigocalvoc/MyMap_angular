import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { MyCountriesComponent } from '../../pages/my-countries/my-countries.component';


@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService );
  private router      = inject( Router )

  public user = computed(() => this.authService.currentUser() );



  onLogout() {
    this.authService.logout();
  }

  userName:string  = this.user()?.name!;






  onNavigateCountries(){
    this.router.navigate(['/dashboard/myCountries']);
  }


  onNavigateRandomCountry(){
    this.router.navigate(['/dashboard/randomCountry']);
  }

  onCapitalInfo(){
    this.router.navigate(['/dashboard/capitalInfo']);
  }
  onCurrencyInfo(){
    this.router.navigate(['/dashboard/currencyInfo']);
  }
  onPopulationInfo(){
    this.router.navigate(['/dashboard/populationInfo']);
  }
  onFlagInfo(){
    this.router.navigate(['/dashboard/flagInfo']);
  }




}
