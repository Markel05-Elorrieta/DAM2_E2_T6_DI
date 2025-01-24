import { Pipe, PipeTransform } from '@angular/core';
import { Argazkia, IUser } from '../interfaces/IUser';

@Pipe({
  name: 'photosPipe',
  standalone: true,
  pure: false,
})
export class PhotosPipe implements PipeTransform {
  transform(argazkia: Argazkia | undefined | null): string {
    const defaultImage = 'no-foto.png';
    console.log(argazkia?.data);
    if (argazkia?.data != null) {
      const pic = "data:image/jpeg;base64," + this.arrayBufferToBase64(argazkia.data);
      console.log(pic);
      return pic;
    } else {
      return defaultImage;
    }
  }

  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const len = buffer.length;
    console.log(len);
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(buffer[i]);
    }
    return window.btoa(binary);
  }
}
