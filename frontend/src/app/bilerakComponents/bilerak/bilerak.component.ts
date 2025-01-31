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
    this.map = new mapboxgl.Map({
      container: 'mapa',
      accessToken:
        'pk.eyJ1IjoibWFya2VsMDUiLCJhIjoiY200dHAyY2UwMDF4YTJrcXNmajVyMG8yYiJ9.nUmvtDKqzjIZZCsvcAhJ7A',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-3.7038, 40.4168],
      zoom: 4,
    });

    this.bileraID = this.activatedRoute.snapshot.params['id'];
    this.getBilera();

    const url = this.router.url;
    if (url.includes('teachers')) {
      this.returnRoute = '/teachers';
    } else if (url.includes('students')) {
      this.returnRoute = '/students';
    } else {
      this.returnRoute = '/god-admin';
    }
  }

  getBilera() {
    if (this.bileraID !== undefined) {
      const url = this.router.url;
      if (url.includes('teachers')) {
        this.hezkuntzaService
          .getIrakasleBileraByID(this.bileraID)
          .subscribe((data: IReunionesProfesor) => {
            this.bilerakProfesor = data;
            this.getIkastetxeak();
          });
      } else if (url.includes('students')) {
        this.hezkuntzaService
          .getIkasleBileraByID(this.bileraID)
          .subscribe((data: IReunionesAlumno) => {
            this.bilerakAlumno = data;
            this.getIkastetxeak();
          });
      } else {
        this.hezkuntzaService
          .getGodAdminBileraByID(this.bileraID)
          .subscribe((data: IReunionesGeneral) => {
            this.bilerakGodAdmin = data;
            this.getIkastetxeak();
          });
      }
    }
  }

  getIkastetxeak() {
    if (this.bilerakAlumno !== undefined) {
      this.hezkuntzaService
        .getIkastetxeaByID(this.bilerakAlumno.id_centro)
        .subscribe(
          (data: IIkastetxeak) => {
            this.ikastetxea = data;
            this.addMarkerBilera();
          },
          (error: any) => {
            console.log('Error loading ikastetxea info!');
          }
        );
    } else if (this.bilerakProfesor !== undefined) {
      this.hezkuntzaService
        .getIkastetxeaByID(this.bilerakProfesor.id_centro)
        .subscribe(
          (data: IIkastetxeak) => {
            this.ikastetxea = data;
            this.addMarkerBilera();
          },
          (error: any) => {
            console.log('Error loading ikastetxea info!');
          }
        );
    } else {
      if (this.bilerakGodAdmin !== undefined) {
        this.hezkuntzaService
          .getIkastetxeaByID(this.bilerakGodAdmin.id_centro)
          .subscribe(
            (data: IIkastetxeak) => {
              this.ikastetxea = data;
              this.addMarkerBilera();
            },
            (error: any) => {
              console.log('Error loading ikastetxea info!');
            }
          );
      }
    }
  }

  addMarkerBilera() {
    if (this.ikastetxea) {
      console.log(this.ikastetxea);
      this.map.setCenter([this.ikastetxea.LATITUD, this.ikastetxea.LONGITUD]);
      this.map.setZoom(11);
      new mapboxgl.Marker()
        .setLngLat([this.ikastetxea.LATITUD, this.ikastetxea.LONGITUD])
        .setPopup(
          new mapboxgl.Popup({ maxWidth: '300px' }).setHTML(`
          <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="margin: 0; color: #007BFF; font-size: 1.2rem; margin-bottom: 1rem;">${this.ikastetxea?.NOM}</h2>
        <p style="margin: 0;">Municipio: ${this.ikastetxea?.DMUNIC}</p>
        <p style="margin: 0;">Dirección: ${this.ikastetxea?.DOMI}</p>
        <p style="margin: 0;">Código Postal: ${this.ikastetxea?.CPOS}</p>
        <p style="margin: 0;">Teléfono: ${this.ikastetxea?.TEL1}</p>
        <p style="margin: 0;">Email: <a href="mailto:${this.ikastetxea?.EMAIL}">${this.ikastetxea?.EMAIL}</a></p>
        <p style="margin: 0;">Página web: <a href="${this.ikastetxea?.PAGINA}" target="_blank">${this.ikastetxea?.PAGINA}</a></p>
          </div>
          `)
        )
        .addTo(this.map);
    } else {
      console.log('Ikastetxea is undefined');
    }
  }
}
