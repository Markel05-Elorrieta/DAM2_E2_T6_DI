import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { IUser } from '../../interfaces/IUser';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { IOrdutegia } from '../../interfaces/IOrdutegia';
import { PhotosPipe } from "../../pipes/photos.pipe";
import { BilerakCardComponent } from '../../bilerakComponents/bilerak-card/bilerak-card.component';
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

  constructor(private hezkuntzaService: HezkuntzaService) {}

  ngOnInit() {
    this.getLoggedUser();
    this.getTimetableIkasle();
    this.getIkasleBilerak();
  }

  user: IUser | undefined;
  schedule: IOrdutegia[] = [];
  bilerak: any[] = [];
  hours = ['1', '2', '3', '4', '5'];

  getLoggedUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.user = user;
  }

  decodeImageBase64() {
    return `data:image/jpeg;base64,${this.user?.argazkia}`;
  }

  getTimetableIkasle() {
    if (this.user) {
      this.hezkuntzaService
        .getIkasleOrdutegia(this.user.id)
        .subscribe((response: IOrdutegia) => {
          this.schedule.push(response);
        });
    }
  }

  getIkasleBilerak() {
    if (this.user) {
      this.hezkuntzaService.getIkasleBilerak(this.user.id).subscribe(
        (response: any) => {
          this.bilerak = response;
        }
      );
    }
  }

  findModule(day: string, hour: string): string {  
    const scheduleArray = this.schedule[0];
  
    if (!Array.isArray(scheduleArray)) {
      return '';
    }
  
    const module = scheduleArray.find(s => s.dia === day && s.hora === hour);
    const aux = module ? module.modulo : '-';
    return aux;
  }
}
