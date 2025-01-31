import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IUser } from '../../../interfaces/IUser';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { PhotosPipe } from "../../../pipes/photos.pipe";

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CardModule, RouterLink, TranslateModule, CommonModule, PhotosPipe],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  userDetails: IUser | undefined;
  userID: number | undefined;
  returnRoute: string = '/';

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.userID = this.route.snapshot.params['id'];
    this.getUserInfo();

    const url = this.router.url;
    if (url.includes('teachers')) {
      this.returnRoute = '/teachers';
    } else if (url.includes('students')) {
      this.returnRoute = '/students';
    } else {
      this.returnRoute = '/god-admin';
    }
  }

  getUserInfo() {
    if (this.userID !== undefined) {
      this.authService.getUserInfoByID(this.userID).subscribe((response: IUser) => {
        this.userDetails = response;
      });
    }
  }
}
