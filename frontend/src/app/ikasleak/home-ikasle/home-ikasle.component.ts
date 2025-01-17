import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { IHorarios } from '../../interfaces/IHorarios';

@Component({
  selector: 'app-home-ikasle',
  standalone: true,
  imports: [ CommonModule, CardModule, TableModule, ListboxModule ],
  templateUrl: './home-ikasle.component.html',
  styleUrl: './home-ikasle.component.css'
})
export class HomeIkasleComponent {
  title = 'HezkuntzaErronka2';

  constructor(private authService: AuthService, private hezkuntzaService: HezkuntzaService) {}

  ngOnInit() {
    this.getLoggedUser();
    this.getTimetableIkasle();
  }

  user: IUser | undefined;

  schedule = [
    { day: 'Monday', time: '08:00 - 10:00', activity: 'Math' },
    { day: 'Tuesday', time: '10:00 - 12:00', activity: 'Science' },
    // Add more schedule items as needed
  ];

  meetings = [
    { title: 'Project Meeting', details: 'Discuss project requirements', date: new Date(), time: '14:00' },
    { title: 'Team Meeting', details: 'Weekly team sync-up', date: new Date(), time: '16:00' },
    // Add more meetings as needed
  ];

  getLoggedUser() {
    this.user = this.authService.getUser();
  }

  getTimetableIkasle() {
    if (this.user) {
      this.hezkuntzaService.getIkasleOrdutegia(this.user.id).subscribe(
        (response: IHorarios) => {
          console.log(response);
        }
      );
    }
  }
}
