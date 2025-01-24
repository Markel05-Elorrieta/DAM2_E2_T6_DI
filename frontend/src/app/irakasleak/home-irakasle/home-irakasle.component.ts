import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { BilerakCardComponent } from '../../bilerak-card/bilerak-card.component';
import { IUser } from '../../interfaces/IUser';
import { PhotosPipe } from '../../pipes/photos.pipe';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { IOrdutegia } from '../../interfaces/IOrdutegia';
import { IReunionesProfesor } from '../../interfaces/IReunionesProfesor';

@Component({
  selector: 'app-home-irakasle',
  standalone: true,
  imports: [
    CardModule,
    TableModule,
    ListboxModule,
    RouterLink,
    CommonModule,
    DividerModule,
    BilerakCardComponent,
    PhotosPipe,
    PanelModule,
  ],
  templateUrl: './home-irakasle.component.html',
  styleUrl: './home-irakasle.component.css',
})
export class HomeIrakasleComponent {
  title = 'HezkuntzaErronka2';

  searchQuery: string = '';
  filteredStudents: any[] = [];
  user: IUser | undefined;
  schedule: any[][] = [];
  auxSchedule: IOrdutegia[] = [];
  bilerak: IReunionesProfesor[] = [];

  constructor(private hezkuntzaService: HezkuntzaService) {}

  ngOnInit() {
    this.getLoggedUser();
    this.getTimetableIrakasle();
    this.setSchedulesByTime();
    this.getIrakasleBilerak();
  }

  getLoggedUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.user = user;
    return user ? user.nombre : '';
  }

  getTimetableIrakasle() {
    if (this.user) {
      this.hezkuntzaService
        .getIrakasleOrdutegia(this.user.id)
        .subscribe((response: IOrdutegia) => {
          console.log(response);
          this.auxSchedule.push(response);
          console.log(this.auxSchedule);
        });
    }
  }

  getIrakasleBilerak() {
    if (this.user) {
      this.hezkuntzaService.getIrakasleBilerak(this.user.id).subscribe(
        (response: any) => {
          console.log(response);
          this.bilerak = response;
        }
      );
    }
  }

  searchStudents() {
    console.log(this.searchQuery);
  }

  setSchedulesByTime() {
    // Inicializar la matriz de horarios (5 filas x 5 columnas)
    this.schedule = Array.from({ length: 5 }, () => Array(5).fill(null));

    for (let i = 1; i <= 5; i++) {
      // Filtrar los módulos por día y hora correspondientes
      const lunes = this.auxSchedule.find(
        (aux) => aux.dia === 'L/A' && aux.hora === i.toString()
      );
      const martes = this.auxSchedule.find(
        (aux) => aux.dia === 'M/A' && aux.hora === i.toString()
      );
      const miercoles = this.auxSchedule.find(
        (aux) => aux.dia === 'X' && aux.hora === i.toString()
      );
      const jueves = this.auxSchedule.find(
        (aux) => aux.dia === 'J/O' && aux.hora === i.toString()
      );
      const viernes = this.auxSchedule.find(
        (aux) => aux.dia === 'V/O' && aux.hora === i.toString()
      );

      // Asignar los valores a la matriz de horarios
      this.schedule[i - 1][0] = lunes?.modulo || '';
      this.schedule[i - 1][1] = martes?.modulo || '';
      this.schedule[i - 1][2] = miercoles?.modulo || '';
      this.schedule[i - 1][3] = jueves?.modulo || '';
      this.schedule[i - 1][4] = viernes?.modulo || '';
    }
    console.log(this.schedule);
  }
}
