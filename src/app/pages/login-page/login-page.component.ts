import { ReactiveFormsModule, Validators, FormControl, FormGroup } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  profileService: ProfileService = inject(ProfileService);
  
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })

  onSubmit() {
    if (this.form.valid) {
      const payload = {
        email: (this.form.get('email')!.value ?? '') as string,
        password: (this.form.get('password')!.value ?? '') as string
      };
      // К примеру email: lindsay.ferguson@reqres.in, password: any, только существующие пользователи могут залогиниться
      this.profileService.loginProfile(payload).subscribe({
        next: (response) => {
            console.log('Profile logged in successfully:', response);
        },
        error: (err) => {
            console.error('Error login profile:', err);
        }
      });
    }
  }
}
