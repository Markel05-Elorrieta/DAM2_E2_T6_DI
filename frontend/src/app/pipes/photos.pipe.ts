import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Pipe({
  name: 'photosPipe',
  standalone: true,
  pure: false,
})
export class PhotosPipe implements PipeTransform {
  transform(user: IUser): string {
    const defaultImage = 'no-foto.png';
    return user.argazkia ? user.argazkia : defaultImage;
  }
}
