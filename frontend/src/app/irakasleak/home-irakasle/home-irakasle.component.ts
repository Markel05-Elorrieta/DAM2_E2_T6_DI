import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-irakasle',
  standalone: true,
  imports: [ CardModule, TableModule, ListboxModule, RouterLink, CommonModule ],
  templateUrl: './home-irakasle.component.html',
  styleUrl: './home-irakasle.component.css'
})
export class HomeIrakasleComponent {
  user = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    // Add more user data as needed
  };

  schedule = [
    { day: 'Monday', time: '08:00 - 10:00', activity: 'Math' },
    { day: 'Tuesday', time: '10:00 - 12:00', activity: 'Science' },
    // Add more schedule items as needed
  ];

  meetings = [
    { id: 1, title: 'Project Meeting', details: 'Discuss project requirements', date: new Date(), time: '14:00' },
    { id: 2, title: 'Team Meeting', details: 'Weekly team sync-up', date: new Date(), time: '16:00' },
    // Add more meetings as needed
  ];

  searchQuery: string = '';
  filteredStudents: any[] = [];

  searchStudents() {
    // Implement search logic here
    this.filteredStudents = [
      { id: 1, nan: '12345678A', name: 'John Smith', cycle: 'Computer Science' },
      { id: 2, nan: '87654321B', name: 'Mary Johnson', cycle: 'Mathematics' },
      // Add more students as needed
    ];
  }
}
