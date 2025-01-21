import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { IReuniones } from '../interfaces/IReuniones';

@Component({
  selector: 'app-bilerak-card',
  standalone: true,
  imports: [CardModule, RouterLink],
  templateUrl: './bilerak-card.component.html',
  styleUrl: './bilerak-card.component.css'
})
export class BilerakCardComponent {
  @Input() bilera!: IReuniones;
}
