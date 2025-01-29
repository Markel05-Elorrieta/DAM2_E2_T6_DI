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
  rolesName : string[] = [];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private hezkuntzaService: HezkuntzaService
  ) 
  
  
  {
    this.formGroup = new FormGroup({
      username: new FormControl(''),
      nombre: new FormControl(''),
      apellidos: new FormControl(''),
      phone: new FormControl(''),
      dni: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      role: new FormControl(''),
      password: new FormControl(''),
    });
  }
  

  ngOnInit() {
    this.userID = this.route.snapshot.params['id'];
    this.getUserTypes();
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
            role: this.getUserType(),
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
        this.rolesName = response.map((role) => role.name);
      },
      (error: any) => {
        console.error('Error loading user types:', error);
      }
    );
  }

  getUserType() {
    return this.roles.find((role) => role.id === this.user?.tipo_id)?.name;
  }

  onSubmit() {
    
    if (this.userID) {
      // Edit existing user
      if (this.formGroup.dirty && this.formGroup.valid) {
        const updatedUser: IUser = {
          ...this.user,
          ...this.formGroup.value,
          tipo_id: this.roles.find(
            (role) => role.name === this.formGroup.value.role
          )?.id
        };

        this.hezkuntzaService.updateUser(updatedUser).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User updated successfully!',
              life: 4500,
            });
            this.router.navigate(['/god-admin']);
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
            (role) => role.name === this.formGroup.value.role
          )?.id,
        };

        this.hezkuntzaService.addUser(newUser).subscribe(
          () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'User added successfully!',
              life: 4500,
            });
            this.router.navigate(['/god-admin']);
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
