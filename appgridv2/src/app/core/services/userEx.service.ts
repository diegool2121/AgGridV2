// src/app/services/user.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/userEx.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
   private http = inject(HttpClient);
    private readonly API_URL = 'http://localhost:3000/api/userEx';

    getUsers(): Observable<Usuario[]> {
      return this.http.get<Usuario[]>(this.API_URL);
    }
    createUser(user: Usuario): Observable<Usuario> {
      return this.http.post<Usuario>(this.API_URL, user);
    }
    deleteAllUsers(): Observable<Usuario[]> {
      return this.http.delete<Usuario[]>(this.API_URL);
    }
}
