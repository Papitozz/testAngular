import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-register-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  profileService: ProfileService = inject(ProfileService);
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  onSubmit() {
    if (this.form.valid) {
      const payload = {
        email: (this.form.get('email')!.value ?? '') as string,
        password: (this.form.get('password')!.value ?? '') as string
      };
      // К примеру email: lindsay.ferguson@reqres.in, password: any, только существующие пользователи могут зарегаться
      this.profileService.registerProfile(payload).subscribe({
        next: (response) => {
            console.log('Profile registered successfully:', response);
        },
        error: (err) => {
            console.error('Error register profile:', err);
        }
      });
    }
  }
}
