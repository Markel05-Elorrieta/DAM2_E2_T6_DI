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

  schedule: IOrdutegia[][] = [];
  auxSchedule: IOrdutegia[] = [];

  meetings = [
    { title: 'Project Meeting', details: 'Discuss project requirements', date: new Date(), time: '14:00' },
    { title: 'Team Meeting', details: 'Weekly team sync-up', date: new Date(), time: '16:00' },
    // Add more meetings as needed
  ];

  getLoggedUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.user = user;
    return user ? user.nombre : '';
  }

  getTimetableIkasle() {
    if (this.user) {
      this.hezkuntzaService.getIkasleOrdutegia(this.user.id).subscribe(
        (response: IOrdutegia) => {
          this.auxSchedule.push(response);
        }
      );
    }
  }

  setSchedulesByTime(){
    for (let i = 1; i <= 5; i++) {
      // Use filter to get all matching schedules for the current hour
      const matchingSchedules = this.auxSchedule.filter(auxSchedule => auxSchedule.hora == i.toString());
      console.log(this.auxSchedule);
      console.log(matchingSchedules);
      // Push each matching schedule into the corresponding schedule array
      if (matchingSchedules.length > 0) {
        this.schedule[i - 1].push(...matchingSchedules); // Spread operator to add all matching schedules
      }
    }
  }
}
