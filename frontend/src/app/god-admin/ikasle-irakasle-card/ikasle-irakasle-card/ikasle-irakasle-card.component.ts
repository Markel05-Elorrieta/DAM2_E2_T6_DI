import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { IUser } from '../../../interfaces/IUser';
import { PhotosPipe } from '../../../pipes/photos.pipe';
import { HezkuntzaService } from '../../../services/hezkuntza.service';

@Component({
  selector: 'app-ikasle-irakasle-card',
  standalone: true,
  imports: [CardModule, PhotosPipe],
  templateUrl: './ikasle-irakasle-card.component.html',
  styleUrl: './ikasle-irakasle-card.component.css',
})
export class IkasleIrakasleCardComponent {
  @Input() ikasle: IUser | undefined;

}
