import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';
import { IUser } from '../interfaces/IUser';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    CommonModule,
    InputNumberModule,
    InputTextModule,
    FloatLabel,
    ButtonModule,
    FormsModule,
    TranslateModule,
    TooltipModule,
    ToastModule,
   ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  title = 'HezkuntzaErronka2';

  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;
  _user!: IUser;

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  login() {
    this.authService.login(this.email, this.password).subscribe(
      (response: { success: boolean; user: IUser }) => {
        if (this.email === '' || this.password === '') {
          this.messageService.add({severity:'warn', summary:'Fill all gaps', detail:'Email or password empty!', life: 5000});
        } else {
          if (response && response.success) {
            this._user = response.user as IUser;
            this.authService.saveUser(this._user);
            this.authService.getUserType(this._user.id).subscribe(
              (userTypeResponse: { userType: String }) => {
                console.log(userTypeResponse);
                if (userTypeResponse && userTypeResponse.userType === 'jainkoa') {
                  this.router.navigate(['/god']);
                } else if (userTypeResponse && userTypeResponse.userType === 'ikaslea') {
                  this.router.navigate(['/students']);
                } else if (userTypeResponse && userTypeResponse.userType === 'irakaslea') {
                  this.router.navigate(['/teachers']);
                } else if (userTypeResponse && userTypeResponse.userType === 'administratzailea') {
                  this.router.navigate(['/admin']);
                } else {
                  this.messageService.add({severity:'error', summary:'Error', detail:'Error fetching user type', life: 5000});
                }
              }
            );
          } else {
            this.messageService.add({severity:'error', summary:'Invalid credentials', detail:'Email or password incorrect!', life: 5000});
          }
        }
      }
    );  
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      this.passwordVisible = true;
    } else {
      passwordInput.type = 'password';
      this.passwordVisible = false;
    }
  }
}
