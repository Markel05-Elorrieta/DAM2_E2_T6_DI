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
import { IReunionesGeneral } from '../../interfaces/IReunionesGeneral';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-bilerak',
  standalone: true,
  imports: [CardModule, CommonModule, RouterLink, TranslateModule],
  templateUrl: './bilerak.component.html',
  styleUrl: './bilerak.component.css',
})
export class BilerakComponent {
  title = 'HezkuntzaErronka2';
  bilerakAlumno: IReunionesAlumno | undefined;
  bilerakProfesor: IReunionesProfesor | undefined;
  bilerakGodAdmin: IReunionesGeneral | undefined;
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
    } else if (url.includes('students')) {
      this.returnRoute = '/students';
    } else {
      this.returnRoute = '/god-admin';
    }

    this.bileraID = this.activatedRoute.snapshot.params['id'];
    this.getBilera();
    //this.getIkastetxeak();
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
          .subscribe((data: IReunionesProfesor) => {
            this.bilerakProfesor = data;
          });
      } else if (url.includes('students')) {
        this.hezkuntzaService
          .getIkasleBileraByID(this.bileraID)
          .subscribe((data: IReunionesAlumno) => {
            this.bilerakAlumno = data;
          });
      } else {
        this.hezkuntzaService
          .getGodAdminBileraByID(this.bileraID)
          .subscribe((data: IReunionesGeneral) => {
            this.bilerakGodAdmin = data;
          });
      }
    }
  }

  /*getIkastetxeak() {
    if (this.bilerakAlumno) {
      this.hezkuntzaService.getIkasleBileraByID(this.bilerakAlumno.id_centro).subscribe(
        (data: IIkastetxeak) => {
          this.ikastetxea = data;
        },
        (error: any) => {
          console.log('Error loading ikastetxea info!');
        }
      );
    } else if (this.bilerakProfesor) {
      this.hezkuntzaService.getIkasleBileraByID(this.bilerakProfesor.id_centro).subscribe(
        (data: IIkastetxeak) => {
          this.ikastetxea = data;
        },
        (error: any) => {
          console.log('Error loading ikastetxea info!');
        }
      );
    } else {
      if (this.bilerakGodAdmin?.id_centro !== undefined) {
        this.hezkuntzaService.getIkasleBileraByID(this.bilerakGodAdmin.id_centro).subscribe(
        (data: IIkastetxeak) => {
          this.ikastetxea = data;
        },
        (error: any) => {
          console.log('Error loading ikastetxea info!');
        }
      );
    }
  }
}*/

  addMarkerBilera() {
    if (this.ikastetxea) {
      new mapboxgl.Marker()
        .setLngLat([this.ikastetxea.LONGITUD, this.ikastetxea.LATITUD])
        .addTo(this.map);
    }
  }
}
