import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { FormsModule, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { HezkuntzaService } from '../../services/hezkuntza.service';
import { RouterLink } from '@angular/router';
import { IUserTypes } from '../../interfaces/IUserTypes';

@Component({
  selector: 'app-editatu-gehitu',
  standalone: true,
  imports: [
    CardModule,
    SelectModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ToastModule,
    RouterLink,
  ],
  templateUrl: './editatu-gehitu.component.html',
  styleUrl: './editatu-gehitu.component.css',
  providers: [MessageService],
})
export class EditatuGehituComponent {
  user: IUser | undefined;
  formGroup: FormGroup;
  userID: number | undefined;

  roles: IUserTypes[] = [];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private hezkuntzaService: HezkuntzaService
  ) {
    this.formGroup = new FormGroup({
      username: new FormControl(this.user?.username),
      nombre: new FormControl(this.user?.nombre),
      apellidos: new FormControl(this.user?.apellidos),
      phone: new FormControl(this.user?.telefono1),
      dni: new FormControl(this.user?.dni),
      address: new FormControl(this.user?.direccion),
      email: new FormControl(this.user?.email),
      role: new FormControl(this.user?.tipo_id),
      password: new FormControl(this.user?.password),
    });
  }

  ngOnInit() {
    this.userID = this.route.snapshot.params['id'];
    this.getUserInfo();
  }

  getUserInfo() {
    if (this.userID) {
      this.authService.getUserInfoByID(this.userID).subscribe(
        (response: IUser) => {
          this.user = response;
          this.formGroup.patchValue({
            username: this.user.username,
            nombre: this.user.nombre,
            apellidos: this.user.apellidos,
            phone: this.user.telefono1,
            dni: this.user.dni,
            address: this.user.direccion,
            email: this.user.email,
            password: this.user.password,
            role: this.getRoleByTipoId(this.user.tipo_id),
          });
        },
        (error: any) => {
          console.error('Error loading user info:', error);
        }
      );
    }
  }

  getUserTypes() {
    this.authService.getAllUserTypes().subscribe(
      (response: IUserTypes[]) => {
        this.roles = response;
      },
      (error: any) => {
        console.error('Error loading user types:', error);
      }
    );
  }

  onSubmit() {
    if (this.userID) {
      // Edit existing user
      if (this.formGroup.dirty && this.formGroup.valid) {
        const updatedUser: IUser = {
          ...this.user,
          ...this.formGroup.value,
          tipo_id: this.roles.find(
            (role) => role.value === this.formGroup.value.role
          )?.tipo_id,
        };

        this.hezkuntzaService.updateUser(updatedUser).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User updated successfully!',
              life: 4500,
            });
            this.router.navigate(['/god']);
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error updating user!',
              life: 4500,
            });
            console.error('Error updating user:', error);
          }
        );
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'No changes made in form!',
          life: 4500,
        });
      }
    } else {
      // Add new user
      if (this.formGroup.valid) {
        const newUser: IUser = {
          ...this.formGroup.value,
          tipo_id: this.roles.find(
            (role) => role.value === this.formGroup.value.role
          )?.tipo_id,
        };

        this.hezkuntzaService.addUser(newUser).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User added successfully!',
              life: 4500,
            });
            this.router.navigate(['/god']);
          },
          (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error adding user!',
              life: 4500,
            });
            console.error('Error adding user:', error);
          }
        );
      } else {
        this.messageService.add({
          severity: 'warn',
          summary: 'Warning',
          detail: 'Form is invalid!',
          life: 4500,
        });
      }
    }
  }

  goBack() {
    this.router.navigate(['/god-admin']);
  }
}
