// src/app/core/services/user.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private readonly API_URL = 'http://localhost:3000/api/users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }
}
