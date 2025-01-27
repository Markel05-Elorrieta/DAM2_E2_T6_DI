import { Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ TooltipModule ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  todayDate() {
    return new Date().getFullYear();
  }
}
