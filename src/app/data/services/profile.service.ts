import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Profile, Source } from '../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public http: HttpClient = inject(HttpClient)
  private apiKey: string = 'reqres-free-v1';
  private requestHeader: HttpHeaders = new HttpHeaders({'x-api-key': this.apiKey});
  private urlUsers: string = 'https://reqres.in/api/users?page=2';
  private urlSources: string = 'https://reqres.in/api/unknown';

  getAccounts() {
    return this.http.get<Profile>(this.urlUsers, {headers: this.requestHeader})
  }
  getSources() {
    return this.http.get<Source>(this.urlSources, {headers: this.requestHeader})
  }
  getAccount(id: string) {
    return this.http.get<{data: Profile}>(`https://reqres.in/api/users/${id}`, {headers: this.requestHeader})
  }
  patchProfile(profile: Partial<Profile>, id: string) {
    return this.http.put<Profile>(`https://reqres.in/api/users/${id}`, profile, {headers: this.requestHeader})
  }
  deleteProfile(id: number) {
    return this.http.delete<Profile>(`https://reqres.in/api/users/${id}`, { headers: this.requestHeader })
  }
  registerProfile(payload: {email: string, password: string}) {
    return this.http.post(`https://reqres.in/api/register`, payload, { headers: this.requestHeader });
  }
  loginProfile(payload: {email: string, password: string}) {
    return this.http.post(`https://reqres.in/api/login`, payload, {headers: this.requestHeader})
  }
}
