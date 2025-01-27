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
  schedule: IOrdutegia[] = [];
  bilerak: IReunionesProfesor[] = [];
  hours = ['1', '2', '3', '4', '5']; // Update based on your time slots

  constructor(private hezkuntzaService: HezkuntzaService) {}

  ngOnInit() {
    this.getLoggedUser();
    this.getTimetableIrakasle();
    this.getIrakasleBilerak();
    console.log(this.schedule);
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
      this.hezkuntzaService.getIrakasleBilerak(this.user.id).subscribe(
        (response: any) => {
          console.log(response);
          this.bilerak = response;
        }
      );
    }
  }

  // Find the module for a given day and hour
  findModule(day: string, hour: string): string {
    console.log(`Searching for ${day} and hour ${hour}`); // Debugging statement
    const module = this.schedule.find(s => s.dia == day && s.hora == hour);
    const aux = module ? module.modulo : '';
    console.log(aux); // Log the result of the search
    return aux; // Return the title if found, otherwise empty string
  }

  searchStudents() {
    console.log(this.searchQuery);
  }


}
