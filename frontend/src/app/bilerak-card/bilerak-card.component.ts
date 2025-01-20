import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bilerak-card',
  standalone: true,
  imports: [CardModule, RouterLink],
  templateUrl: './bilerak-card.component.html',
  styleUrl: './bilerak-card.component.css'
})
export class BilerakCardComponent {

  
    
}
