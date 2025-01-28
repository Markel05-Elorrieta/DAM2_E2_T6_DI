import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { IUser } from '../../../interfaces/IUser';
import { PhotosPipe } from '../../../pipes/photos.pipe';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ikasle-irakasle-card',
  standalone: true,
  imports: [CardModule, PhotosPipe, ButtonModule],
  templateUrl: './ikasle-irakasle-card.component.html',
  styleUrl: './ikasle-irakasle-card.component.css',
})
export class IkasleIrakasleCardComponent {
  @Input() ikasleIrakasle: IUser | undefined;

  constructor(private router: Router) {}

  ngOnInit() {}

  getLoggedInUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  editUser(id: number | undefined) {
    if (this.getLoggedInUser().id === id) {
      
      return;
    }
    this.router.navigate([`/god-admin/edit/${id}`]);
  }

  deleteUser(id: number | undefined) {
    if (this.getLoggedInUser().id === id) {
      
      return;
    }
    
    
  }

}
