import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject, Input } from '@angular/core';
import { Profile } from '../data/interfaces/profile.interface';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../data/services/profile.service';

@Component({
  selector: 'app-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() profile!: Profile;

  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);

  deleteProfile() {

    const id = this.profile.id;
    this.profileService.deleteProfile(id).subscribe({
        next: (response) => {
            console.log('Profile deleted successfully:', response);
        },
        error: (err) => {
            console.error('Error deleting profile:', err);
        }
    });
  }
}