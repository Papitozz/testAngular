import { SourceCardComponent } from '../../source-card/source-card.component';
import { CardComponent } from '../../card/card.component';
import { ProfileService } from '../../data/services/profile.service';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Source, Profile } from '../../data/interfaces/profile.interface';

@Component({
  selector: 'app-search-page',
  imports: [RouterOutlet, CommonModule, CardComponent, SourceCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {
 profileService: ProfileService = inject(ProfileService);
  profiles: Profile[] = [];
  sources: Source[] = [];
  user: Profile[] = [];

  constructor() {
    this.profileService.getAccounts().subscribe(val => {
      this.profiles = val.data;
    })
    this.profileService.getSources().subscribe(val => {
      this.sources = val.data;
    })
  }
}
