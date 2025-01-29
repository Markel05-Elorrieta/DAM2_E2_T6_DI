import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { BilerakCardComponent } from '../../bilerakComponents/bilerak-card/bilerak-card.component';
import { IUser } from '../../interfaces/IUser';
import { PhotosPipe } from '../../pipes/photos.pipe';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { IOrdutegia } from '../../interfaces/IOrdutegia';
import { IReunionesProfesor } from '../../interfaces/IReunionesProfesor';
import { FormsModule } from '@angular/forms';

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
    FormsModule,
  ],
  templateUrl: './home-irakasle.component.html',
  styleUrl: './home-irakasle.component.css',
})
export class HomeIrakasleComponent {
  title = 'HezkuntzaErronka2';

  searchQueryStudent: string = '';
  filteredStudents: IUser[] = [];
  students: IUser[] = [];
  user: IUser | undefined;
  schedule: IOrdutegia[] = [];
  bilerak: IReunionesProfesor[] = [];
  hours = ['1', '2', '3', '4', '5'];
  searchForm: any;

  constructor(private hezkuntzaService: HezkuntzaService) {}

  ngOnInit() {
    this.getLoggedUser();
    this.getTimetableIrakasle();
    this.getIrakasleBilerak();
    this.getIkasleak();
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
          this.schedule.push(response);
        });
    }
  }

  getIrakasleBilerak() {
    if (this.user) {
      this.hezkuntzaService
        .getIrakasleBilerak(this.user.id)
        .subscribe((response: any) => {
          this.bilerak = response;
        });
    }
  }

  getIkasleak() {
    this.hezkuntzaService.getAllIkasleak().subscribe((response: IUser[]) => {
      this.students = response;
    });
  }

  findModule(day: string, hour: string): string {
    const scheduleArray = this.schedule[0];

    if (!Array.isArray(scheduleArray)) {
      return '';
    }

    const module = scheduleArray.find((s) => s.dia === day && s.hora === hour);
    const aux = module ? module.modulo : '-';
    return aux;
  }

  searchStudents() {
    const query = this.searchQueryStudent.trim().toLowerCase();
    if (query === '') {
      this.getIkasleak();
    } else {
      this.students = this.students.filter((student) =>
        student.nombre.toLowerCase().includes(query) ||
        student.dni.toLowerCase().includes(query) ||
        student.apellidos.toLowerCase().includes(query)
      );
    }
  }
}
