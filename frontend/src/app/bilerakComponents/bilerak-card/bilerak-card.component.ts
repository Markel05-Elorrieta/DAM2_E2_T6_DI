import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';
import { IReunionesAlumno } from '../../interfaces/IReunionesAlumno';
import { IReunionesProfesor } from '../../interfaces/IReunionesProfesor';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-bilerak-card',
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule, CommonModule],
  templateUrl: './bilerak-card.component.html',
  styleUrl: './bilerak-card.component.css'
})
export class BilerakCardComponent {
  @Input() bilera!: IReunionesAlumno | IReunionesProfesor;
  baseRoute: string;

  constructor(private router: Router) {
    const url = this.router.url;
    if (url.includes('teachers')) {
      this.baseRoute = '/teachers/meeting';
    } else if (url.includes('students')) {
      this.baseRoute = '/students/meeting';
    } else {
      this.baseRoute = '/meeting';
    }
  }
}
