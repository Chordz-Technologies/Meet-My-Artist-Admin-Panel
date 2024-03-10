import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(aname: string, apassword: string): Observable<any> {
    const data = { aname, apassword };
    return this.http.post<any>(`https://meetmyartist.beatsacademy.in/adminLogin/`, data);
  }

  isLoggedIn() {
    return !!localStorage.getItem('admin');
  }
}