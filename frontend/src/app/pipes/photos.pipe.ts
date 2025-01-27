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
    if (argazkia?.data != null) {
      const pic = "data:image/jpeg;base64," + this.arrayBufferToBase64(argazkia.data);
      return pic;
    } else {
      return defaultImage;
    }
  }

  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
}
