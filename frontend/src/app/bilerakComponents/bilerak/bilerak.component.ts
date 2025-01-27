import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { IReunionesAlumno } from '../../interfaces/IReunionesAlumno';
import { IReunionesProfesor } from '../../interfaces/IReunionesProfesor';
import { ActivatedRoute } from '@angular/router';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { Router, RouterLink } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { IIkastetxeak } from '../../interfaces/IIkastetxeak';

@Component({
  selector: 'app-bilerak',
  standalone: true,
  imports: [CardModule, CommonModule, RouterLink],
  templateUrl: './bilerak.component.html',
  styleUrl: './bilerak.component.css',
})
export class BilerakComponent {
  title = 'HezkuntzaErronka2';
  bilerakAlumno: IReunionesAlumno | undefined;
  bilerakProfesor: IReunionesProfesor | undefined;
  bileraID: number | undefined;
  ikastetxea: IIkastetxeak | undefined;
  filteredIkastetxea: IIkastetxeak | undefined;
  returnRoute: string = '/';
  map!: mapboxgl.Map;

  constructor(
    private activatedRoute: ActivatedRoute,
    private hezkuntzaService: HezkuntzaService,
    private router: Router
  ) {}

  ngOnInit() {
    const url = this.router.url;
    if (url.includes('teachers')) {
      this.returnRoute = '/teachers';
    } else {
      this.returnRoute = '/students';
    }

    this.bileraID = this.activatedRoute.snapshot.params['id'];
    this.getBilera();
    this.getIkastetxeak();
    this.addMarkerBilera();

    this.map = new mapboxgl.Map({
      container: 'mapa',
      accessToken:
      'pk.eyJ1IjoibWFya2VsMDUiLCJhIjoiY200dHAyY2UwMDF4YTJrcXNmajVyMG8yYiJ9.nUmvtDKqzjIZZCsvcAhJ7A',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-3.7038, 40.4168],
      zoom: 4,
    });
  }

  getBilera() {
    if (this.bileraID !== undefined) {
      const url = this.router.url;
      if (url.includes('teachers')) {
        this.hezkuntzaService
          .getIrakasleBileraByID(this.bileraID)
          .subscribe((data) => {
            this.bilerakProfesor = data;
          });
      } else if (url.includes('students')) {
        this.hezkuntzaService
          .getIkasleBileraByID(this.bileraID)
          .subscribe((data) => {
            this.bilerakAlumno = data;
          });
      }
    }
  }

  getIkastetxeak() {
    this.hezkuntzaService.getIkastetxeak().subscribe((data) => {
      this.ikastetxea = data;
    });
    this.filterIkastetxeakByCodCentro();
  }

  filterIkastetxeakByCodCentro() {
    if (this.ikastetxea) {
      return this.ikastetxea.filter(
        (ikastetxea) => ikastetxea.CCEN === this.bilerakAlumno?.id_centro
      );
    }
    return [];
  }

  addMarkerBilera() {
    console.log(this.ikastetxea);
    if (this.ikastetxea) {
      new mapboxgl.Marker()
        .setLngLat([this.ikastetxea.LONGITUD, this.ikastetxea.LATITUD])
        .addTo(this.map);
    }
  }
}
