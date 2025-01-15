import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, SelectModule, FormsModule, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  languages = [
    { name: 'EUS', code: 'eu' },
    { name: 'ES', code: 'es' },
  ];
  selectedLanguage: string = 'eu';

  constructor(private translateService: TranslateService) {}

  translateText(event: any) {
    this.translateService.use(event.value);
  }
}
