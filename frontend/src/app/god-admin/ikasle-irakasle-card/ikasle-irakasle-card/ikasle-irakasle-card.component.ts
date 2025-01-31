import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { IUser } from '../../../interfaces/IUser';
import { PhotosPipe } from '../../../pipes/photos.pipe';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-ikasle-irakasle-card',
  standalone: true,
  imports: [CardModule, PhotosPipe, ButtonModule, ConfirmDialogModule, TranslateModule],
  templateUrl: './ikasle-irakasle-card.component.html',
  styleUrl: './ikasle-irakasle-card.component.css',
  providers: [MessageService, ConfirmationService],
})
export class IkasleIrakasleCardComponent {
  @Input() ikasleIrakasle: IUser | undefined;

  constructor(
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private translateService: TranslateService
  ) {}

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

  detailsUser(id: number | undefined) {
    this.router.navigate([`/god-admin/user/${id}`]);
  }

  deleteUser(id: number | undefined) {
    if (this.getLoggedInUser().id === id) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'You cannot delete yourself!',
      });
      return;
    } else if (id !== undefined) {
      this.authService
        .deleteUser(id)
        .subscribe((response: { success: boolean }) => {
          if (response.success) {
            this.messageService.add({
              severity: 'success',
              summary: 'User deleted',
              detail: 'User correctly deleted!',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error deleting user!',
            });
          }
        });
    }
  }

  confirmDeleteUser(id: number | undefined) {
    this.confirmationService.confirm({
      message: this.translateService.instant('ikasle-irakasle.message'),
      header: this.translateService.instant('ikasle-irakasle.header') + ' ' + this.ikasleIrakasle?.username,
      acceptButtonProps: {
        label: this.translateService.instant('ikasle-irakasle.delete'),
        severity: 'danger',
      },
      rejectButtonProps: {
        label: this.translateService.instant('ikasle-irakasle.cancel'),
        severity: 'secondary',
        outlined: true,
      },
      accept: () => {
        this.deleteUser(id);
      },
    });
  }
}
