import { ProfileService } from './../../data/services/profile.service';
import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Profile } from '../../data/interfaces/profile.interface';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-page',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {

  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  profile$: Observable<{data: Profile}> = this.route.params
  .pipe(
    switchMap(({id}) => this.profileService.getAccount(id))
  )

  form = this.fb.group({
    fName: ['', Validators.required],
    lName: ['', Validators.required],
    email: ['', Validators.required]
  })

  constructor() {
        this.profile$.subscribe((profile) => {
            if (profile && profile.data) {
                this.form.patchValue({
                    fName: profile.data.first_name,
                    lName: profile.data.last_name,
                    email: profile.data.email
                });
            }
        });
    }

  changeProfile() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    const id = this.route.snapshot.params['id'];
    //@ts-ignore
    this.profileService.patchProfile(this.form.value, id).subscribe({
        next: (response) => {
            console.log('Profile deleted successfully:', response);
        },
        error: (err) => {
            console.error('Error updating profile:', err);
        }
    });
  }

value: any;

}