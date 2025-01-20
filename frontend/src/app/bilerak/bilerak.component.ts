import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bilerak',
  standalone: true,
  imports: [ CardModule, CommonModule ],
  templateUrl: './bilerak.component.html',
  styleUrl: './bilerak.component.css'
})
export class BilerakComponent {

}
