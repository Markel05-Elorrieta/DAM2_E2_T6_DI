import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../interfaces/IUser';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { IOrdutegia } from '../../interfaces/IOrdutegia';

@Component({
  selector: 'app-home-ikasle',
  standalone: true,
  imports: [ CardModule, TableModule, ListboxModule, CommonModule ],
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

  schedule: IOrdutegia[] = [];

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
        (response: IOrdutegia) => {
          this.schedule.push(response);
          console.log(this.schedule);
        }
      );
    }
  }
}
