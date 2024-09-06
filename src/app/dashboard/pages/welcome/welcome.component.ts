import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  private authService = inject( AuthService );
  private router      = inject( Router )



  percentage:number = 0;
  circumference:number = 100;

  ngOnInit(): void {
    this.updateProgress();
    this.simulatePercentageChange();
  }



  updateProgress() {
    const radius = 15.9155;
    this.circumference = 2 * Math.PI * radius;
  }

  simulatePercentageChange() {
    // Aquí simulas un cambio en el porcentaje
    setTimeout(() => {
      this.percentage = 90; // Cambia este valor según sea necesario
    }, 1000);
  }



  onNavigateCountries(){
    this.router.navigate(['/dashboard/myCountries']);
  }

}
