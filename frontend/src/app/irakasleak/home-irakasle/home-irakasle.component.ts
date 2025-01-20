import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { RouterLink } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { BilerakCardComponent } from '../../bilerak-card/bilerak-card.component';
import { IUser } from '../../interfaces/IUser';
import { PhotosPipe } from '../../pipes/photos.pipe';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { IOrdutegia } from '../../interfaces/IOrdutegia';

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
  ],
  templateUrl: './home-irakasle.component.html',
  styleUrl: './home-irakasle.component.css',
})
export class HomeIrakasleComponent {
  title = 'HezkuntzaErronka2';

  searchQuery: string = '';
  filteredStudents: any[] = [];
  user: IUser | undefined;
  schedule: IOrdutegia | undefined;

  constructor(private hezkuntzaService: HezkuntzaService) {}

  ngOnInit() {
    this.getLoggedUser();
    this.getTimetableIrakasle();
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
          this.schedule = response;
        });
    }
  }

  meetings = [
    {
      id: 1,
      title: 'Project Meeting',
      details: 'Discuss project requirements',
      date: new Date(),
      time: '14:00',
    },
    {
      id: 2,
      title: 'Team Meeting',
      details: 'Weekly team sync-up',
      date: new Date(),
      time: '16:00',
    },
    // Add more meetings as needed
  ];

  searchStudents() {
    // Implement search logic here
    this.filteredStudents = [
      {
        id: 1,
        nan: '12345678A',
        name: 'John Smith',
        cycle: 'Computer Science',
      },
      { id: 2, nan: '87654321B', name: 'Mary Johnson', cycle: 'Mathematics' },
      // Add more students as needed
    ];
  }
}
