import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { IUser } from '../../interfaces/IUser';
import { PhotosPipe } from "../../pipes/photos.pipe";
import { AuthService } from '../../services/auth.service';
import { DividerModule } from 'primeng/divider';
import { IkasleIrakasleCardComponent } from '../ikasle-irakasle-card/ikasle-irakasle-card/ikasle-irakasle-card.component';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { LoadingComponent } from "../../loading-spinner/loading/loading.component";
import { Router } from '@angular/router';
import { IReunionesGeneral } from '../../interfaces/IReunionesGeneral';
import { BilerakCardComponent } from '../../bilerakComponents/bilerak-card/bilerak-card.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-god-admin',
  standalone: true,
  imports: [CardModule, PhotosPipe, CommonModule, DividerModule, IkasleIrakasleCardComponent, LoadingComponent, BilerakCardComponent, TranslateModule],
  templateUrl: './god-admin.component.html',
  styleUrl: './god-admin.component.css'
})
export class GodAdminComponent {
  user: IUser | undefined;
  userType: String | undefined;
  ikasleak: IUser[] = [];
  irakasleak: IUser[] = [];
  admins: IUser[] = [];
  bilerak: IReunionesGeneral[] = [];

  constructor(private authService: AuthService, private hezkuntzaService: HezkuntzaService, private router: Router) {}

  ngOnInit() {
    this.getLoggedUser();
    this.getUserType();
    this.getAllIkasleak();
    this.getAllIrakasleak();
    this.getAllBilerakToday();
    this.getAllAdmins();
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

  getAllBilerakToday() {
    this.hezkuntzaService.getTodayBilerak().subscribe((response: IReunionesGeneral[]) => {
      this.bilerak = response;
    });
  }

  getAllIkasleak() {
    this.hezkuntzaService.getAllIkasleak().subscribe((response: IUser[]) => {
      this.ikasleak = response;
    });
  }

  getAllIrakasleak() {
    this.hezkuntzaService.getAllIrakasleak().subscribe((response: IUser[]) => {
      this.irakasleak = response;
    });
  }

  getAllAdmins() {
    this.hezkuntzaService.getAllAdmins().subscribe((response: IUser[]) => {
      this.admins = response;
    });
  }

  addUser() {
    this.router.navigate(['/god-admin/add']);
  }
}
