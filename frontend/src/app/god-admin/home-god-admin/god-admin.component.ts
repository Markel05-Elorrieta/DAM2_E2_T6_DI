import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IUser } from '../../interfaces/IUser';
import { PhotosPipe } from "../../pipes/photos.pipe";
import { AuthService } from '../../services/auth.service';
import { DividerModule } from 'primeng/divider';
import { IkasleIrakasleCardComponent } from '../ikasle-irakasle-card/ikasle-irakasle-card/ikasle-irakasle-card.component';
import { HezkuntzaService } from '../../services/hezkuntza.service';

@Component({
  selector: 'app-god-admin',
  standalone: true,
  imports: [CardModule, PhotosPipe, CommonModule, DividerModule, IkasleIrakasleCardComponent],
  templateUrl: './god-admin.component.html',
  styleUrl: './god-admin.component.css'
})
export class GodAdminComponent {
  user: IUser | undefined;
  userType: String | undefined;
  ikasleak: IUser[] = [];

  constructor(private authService: AuthService, private hezkuntzaService: HezkuntzaService) {}

  ngOnInit() {
    this.getLoggedUser();
    this.getUserType();
    this.getAllIkasleak();
  }

  getLoggedUser() {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.user = user;
  }

  getUserType() {
    return this.authService.getUserType(this.user!.id).subscribe(
      (response: { userType: String }) => {
        this.userType = response.userType;
      }
    );
  }

  getAllIkasleak() {
    this.hezkuntzaService.getAllIkasleak().subscribe((response: IUser[]) => {
      this.ikasleak = response;
    });
  }
}
