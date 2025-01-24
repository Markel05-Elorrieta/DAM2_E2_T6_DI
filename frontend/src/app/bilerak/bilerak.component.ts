import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { IReunionesAlumno } from '../interfaces/IReunionesAlumno';
import { IReunionesProfesor } from '../interfaces/IReunionesProfesor';
import { ActivatedRoute } from '@angular/router';
import { HezkuntzaService } from '../services/hezkuntza.service';
import { Router, RouterLink } from '@angular/router';

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
  returnRoute: string = '/';

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
}
