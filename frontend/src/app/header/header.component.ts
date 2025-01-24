import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { PhotosPipe } from '../pipes/photos.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    SelectModule,
    FormsModule,
    TranslateModule,
    MenuModule,
    ButtonModule,
    PhotosPipe,
    TooltipModule,
    ToggleSwitchModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(
    private translateService: TranslateService,
    private authService: AuthService,
    private router: Router
  ) {}

  languages = [
    { name: 'EU', code: 'eu' },
    { name: 'ES', code: 'es' },
  ];
  selectedLanguage: string = 'eu';
  checked: boolean = false;
  items: MenuItem[] | undefined;
  loggedUsername: string = '';

  ngOnInit() {
    this.items = [
      {
        label: 'Kaixo, ' + this.getLoggedUser + '!',
        items: [
          {
            label: 'Logout',
            icon: 'pi pi-power-off',
            command: () => {
              this.logout();
            },
          },
        ],
      },
    ];

    this.checked = this.getDarkModePreference();
    this.applyDarkMode(this.checked);
  }

  toggleDarkMode() {
    this.applyDarkMode(this.checked);
    this.saveDarkModePreference();
  }

  applyDarkMode(enable: boolean) {
    const element = document.querySelector('html');
    if (element) {
      if (enable) {
        element.classList.add('my-app-dark');
      } else {
        element.classList.remove('my-app-dark');
      }
    }
  }

  saveDarkModePreference() {
    localStorage.setItem('darkMode', this.checked.toString());
  }

  getDarkModePreference() {
    return localStorage.getItem('darkMode') === 'true';
  }

  getLoggedUser() {

    const user = JSON.parse(localStorage.getItem('user')!);
    return user ? user.nombre : '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  translateText(event: any) {
    this.translateService.use(event.value);
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
