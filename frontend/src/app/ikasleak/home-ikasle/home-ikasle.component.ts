import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { IOrdutegia } from '../../interfaces/IOrdutegia';
import { PhotosPipe } from "../../pipes/photos.pipe";
import { BilerakCardComponent } from '../../bilerak-card/bilerak-card.component';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-home-ikasle',
  standalone: true,
  imports: [CardModule, TableModule, ListboxModule, CommonModule, PhotosPipe, BilerakCardComponent, DividerModule],
  templateUrl: './home-ikasle.component.html',
  styleUrl: './home-ikasle.component.css'
})
export class HomeIkasleComponent {
  title = 'HezkuntzaErronka2';

  constructor(private authService: AuthService, private hezkuntzaService: HezkuntzaService) {}

  ngOnInit() {
    this.getLoggedUser();
    this.getTimetableIkasle();
    this.setSchedulesByTime();
    //console.log(this.auxSchedule);
    //console.log(this.schedule);
  }

  user: IUser | undefined;
  
  schedule: any[][] = [];
  auxSchedule: IOrdutegia[] = [];

  getLoggedUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.user = user;
    return user ? user.nombre : '';
  }

  getTimetableIkasle() {
    if (this.user) {
      this.hezkuntzaService.getIkasleOrdutegia(this.user.id).subscribe(
        (response: IOrdutegia) => {
          console.log(response);
          this.auxSchedule.push(response);
        }
      );
    }
  }

  setSchedulesByTime() {
    // Initialize the schedule matrix
    this.schedule = Array.from({ length: 5 }, () => Array(5).fill({ Modulo: '' }));
  
    for (let i = 1; i <= 5; i++) {
      // Filter schedules for each day of the week
      const days = ['L/A', 'M/A', 'X', 'J/O', 'V/O'];
      days.forEach((day, dayIndex) => {
        const scheduleForDayAndHour = this.auxSchedule.filter(aux => aux.dia === day && aux.hora == i.toString());
        // If there are overlapping modules, join their names
        if (scheduleForDayAndHour.length > 0) {
          this.schedule[i - 1][dayIndex] = {
            Modulo: scheduleForDayAndHour.map(s => s.modulo).join(' / ')
          };
        }
      });
    }
    console.log(this.schedule);
  }
}
