import { Component, effect, inject, signal } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { UserService as UserExService } from '../../core/services/userEx.service';
import { User } from '../../models/user.model'; 
import { Usuario } from '../../models/userEx.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  private userService = inject(UserService);
  private userExService = inject(UserExService);
  users = signal<User[]>([]);
  usersEx = signal<Usuario[]>([]);

  constructor() {
    effect(() => {
      this.userService.getUsers().subscribe((data) => {
        this.users.set(data);
      });
    });

    effect(() => {
      this.userExService.getUsers().subscribe((data) => {
        this.usersEx.set(data);
      });
    });
  }
}
