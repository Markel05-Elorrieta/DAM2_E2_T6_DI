import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SelectModule } from 'primeng/select';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import {
  FormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IUser } from '../../interfaces/IUser';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { HezkuntzaService } from '../../services/hezkuntza.service';

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
  ],
  templateUrl: './editatu-gehitu.component.html',
  styleUrl: './editatu-gehitu.component.css',
  providers: [MessageService],
})
export class EditatuGehituComponent {
  user: IUser | undefined;
  displayDialog: boolean = false;
  formGroup: FormGroup;
  userID: number | undefined;

  roles = [
    { label: 'Admin', value: '2', tipo_id: 2 },
    { label: 'Teacher', value: '3', tipo_id: 3 },
    { label: 'Student', value: '4', tipo_id: 4 },
    { label: 'God', value: '1', tipo_id: 1 },
  ];

  status = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'Aceptada', value: 'aceptada' },
    { label: 'Denegada', value: 'denegada' },
    { label: 'Conflicto', value: 'conflicto' },
  ];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private hezkuntzaService: HezkuntzaService,
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
            role: this.getRoleByTipoId(this.user.tipo_id),
            password: this.user.password,
          });
        },
        (error: any) => {
          console.error('Error loading user info:', error);
        }
      );
    } else {
      console.error('UserID is not defined');
    }
  }

  getRoleByTipoId(tipo_id: number | undefined): string | undefined {
    const role = this.roles.find((role) => role.tipo_id === tipo_id);
    return role ? role.value : undefined;
  }

  onSubmit() {
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
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User updated successfully!' });
          this.router.navigate(['/god']);
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error updating user!' });
          console.error('Error updating user:', error);
        }
      );
    } else {
      this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'No changes made in form!' });  
    }
  }
}
