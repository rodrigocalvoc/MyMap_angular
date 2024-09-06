import { CountryInput } from './../models/countriesInput.model';
import { AfterViewInit, Component, computed, inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environments';
import { Icon, latLng, Map, marker, tileLayer } from 'leaflet';
import { DataService } from '../../services/data.service';
import { count, map, Observable } from 'rxjs';
import { CountriesApiResponse } from '../models/countriesApiResponse.models';
import * as L from 'leaflet';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/interfaces';
import Swal from 'sweetalert2';









@Component({
  templateUrl: './my-countries.component.html',
  styleUrls: ['./my-countries.component.css']
})
export class MyCountriesComponent implements AfterViewInit, OnInit{

  constructor() { }


  private authService = inject( AuthService );
  private dataService = inject (DataService);

  public user = computed(() => this.authService.currentUser() );
  userCountries:CountryInput[]  = this.user()?.countries!;


  public countries: CountryInput[]  = this.userCountries;
  public likedCountries: CountryInput[] = [];
  public likedStatus: boolean = false;


  public keyword = 'name';
  public data: CountryInput[] = []  ;




  division = 0;
  porcentaje = 0;
  circumference = 2 * Math.PI * 45;
  animationClass = '';

  public input: CountryInput = {
    id: 0,
    latLng: [0,0],
    name: '',
    liked: false,
    oficialName: '',
  };


  public redICon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });



  public map!: L.Map

  markers: L.Marker[] = [];





  public initializeMap() {

    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map');
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Rodrigo Calvo',
      maxZoom: 8,
      }).addTo(this.map);

      // L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      //   subdomains: 'abcd',
      //   maxZoom: 20
      // }).addTo(this.map);

    this.map.touchZoom.disable();
    this.map.doubleClickZoom.disable();
    this.map.scrollWheelZoom.disable();
    this.map.boxZoom.disable();
    this.map.keyboard.disable();
  }


  public addMarkers() {
    this.markers.forEach(marker => marker.addTo(this.map));
  }

  public centerMap() {
    this.map.setView([40.4208, -3.7051], 3);
  }

  public setMarkers(){
    this.countries.forEach(country => {

      this.markers.push(L.marker(country.latLng ,{icon: this.redICon}).bindPopup(country.name));
    });


  }





























  ngOnInit(): void {

    this.getAllCountries();
    this.setMarkers();

    this.division = this.countries.length / 195
    this.porcentaje = parseFloat( this.division.toFixed(2));
    this.animationClass = 'fill-animation';



  }



  ngAfterViewInit(): void {

    this.initializeMap();
    this.addMarkers();
    this.centerMap();

  }


  private getAllCountries(): void{





this.dataService.getAllCountries().pipe(
  map(response => response.map((item: CountriesApiResponse, index:number) => ({id: index +1 , name: item.translations['spa'].common , latLng: item.latlng})))
).subscribe((countriesInput: CountryInput[]) => {
  this.data = countriesInput;
});




  }




  addToList(): void {





     if(!this.input.id){
      Swal.fire({
        title: "El país no existe",
        icon: "error"
      });



       return;
     }

     if (this.countries.some(country => country.id === this.input.id)) {
      Swal.fire({
        title: "Este país ya lo has visitado",
        icon: "error"
      });


       return;
     }


    const currentUser = this.authService.currentUser();
    if (currentUser) {
      currentUser.countries.push(this.input);

      this.authService.updateUserCountries(currentUser._id, currentUser.countries).subscribe({
        next: () => {
          this.markers.push(L.marker(this.input.latLng, { icon: this.redICon }).bindPopup(this.input.name).addTo(this.map));
          this.addMarkers();
          this.division = this.countries.length / 195;
          this.porcentaje = parseFloat(this.division.toFixed(2));
          this.animationClass = 'fill-animation';
        },
        error: (err) => {
          console.error('Error updating user countries:', err);
        }
      });
    }


    Swal.fire({
      position: "top-end",
      icon: "success",
      showConfirmButton: false,
      timer: 1000
    });




  }


  removeCountry(country: CountryInput): void {


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success m-2",
        cancelButton: "btn btn-danger m-2"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Estás seguro?",
      text: "No se podrán revertir los cambios",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, bórralo",
      cancelButtonText: "No, cancelar!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.countries.indexOf(country);
        if (index !== -1) {
          this.countries.splice(index, 1);
          this.markers.forEach((marker, i) => {
            if (marker.getLatLng().equals(country.latLng)) {
              this.map.removeLayer(marker);
              this.markers.splice(i, 1);
            }
          });
          this.division = this.countries.length / 195;
          this.porcentaje = parseFloat(this.division.toFixed(2));
          this.animationClass = 'fill-animation';

          const currentUser = this.authService.currentUser();
          if (currentUser) {
            const updatedCountries = currentUser.countries.filter(c => c.id !== country.id);
            this.authService.updateUserCountries(currentUser._id, updatedCountries).subscribe({
              next: () => {
              },
              error: (err) => {
                console.error('Error eliminando país:', err);
              }
            });
          }
        }
        swalWithBootstrapButtons.fire({
          title: "Borrado!",
          text: "Tu país ha sido eliminado",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Operación cancelada",
          icon: "error"
        });
      }
    });



  }

  likeCountry(country: CountryInput) {



    country.liked = !country.liked;
    const currentUser = this.authService.currentUser();
    if (currentUser) {
      const updatedCountries = currentUser.countries.map(c => {
        if (c.id === country.id) {
          c.liked = country.liked;
        }
        return c;
      });
      this.authService.updateUserCountries(currentUser._id, updatedCountries).subscribe({
        next: () => {
        },
        error: (err) => {
          console.error('Error actualizando país:', err);
        }
      });
    }

    Swal.fire({
      position: "top-end",
      icon: "success",
      showConfirmButton: false,
      timer: 1000
    });
  }



  showFavorites(){

    this.likedStatus = !this.likedStatus;

    if(this.likedStatus == true){
      this.countries.forEach(country => {

        if(country.liked == true){
          this.likedCountries.push(country)
        }

      });




      this.countries = [];



    }

    if(this.likedStatus == false ){

      this.likedCountries = [];
      this.countries = this.user()?.countries!;

    }



  }





  }



