import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../api-reactive-table/api-reactive-table.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private serviceUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get(this.serviceUrl)
      .pipe<User[]>(map((data: any) => data.users));
  }

  getUsersAsync(): Promise<User[]> {
    let result$ = this.http
      .get(this.serviceUrl)
      .pipe<User[]>(map((data: any) => data.users));
    return lastValueFrom(result$);
  }

  updateUser(user: User): Observable<User> {
    return this.http.patch<User>(`${this.serviceUrl}/${user.id}`, user);
  }

  updateUserAsync(user: User): Promise<User> {
    return lastValueFrom(
      this.http.patch<User>(`${this.serviceUrl}/${user.id}`, user)
    );
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.serviceUrl}/add`, user);
  }

  addUserAsync(user: User): Promise<User> {
    return lastValueFrom(this.http.post<User>(`${this.serviceUrl}/add`, user));
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.serviceUrl}/${id}`);
  }

  deleteUserAsync(id: number): Promise<User> {
    return lastValueFrom(this.http.delete<User>(`${this.serviceUrl}/${id}`));
  }

  deleteUsers(users: User[]): Observable<User[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<User>(`${this.serviceUrl}/${user.id}`)
      )
    );
  }

  deleteUsersAsync(users: User[]): Observable<User[]> {
    return forkJoin(
      users.map((user) =>
        this.http.delete<User>(`${this.serviceUrl}/${user.id}`)
      )
    );
  }
}
