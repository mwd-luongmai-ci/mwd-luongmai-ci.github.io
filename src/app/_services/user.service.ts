import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@app/_models';
import { environment } from '@environments/environment';
import { JsonConvert } from 'json2typescript';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
  private jsonConvert: JsonConvert;
  constructor(private http: HttpClient) {
    this.jsonConvert = new JsonConvert();
  }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
      .pipe(map(users => {
        return this.jsonConvert.deserializeArray(users, User);
      }));
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${id}`)
      .pipe(map(user => {
        return this.jsonConvert.deserialize(user, User);
      }));
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  changePassword(id: string, oldPassword: string, newPassword: string) {
    return this.http.put(`${environment.apiUrl}/users/${id}/password`, {
      'old_password': oldPassword,
      'new_password': newPassword
    });
  }

  deactivate(id: number) {
    return this.http.put(`${environment.apiUrl}/users/${id}/deactivate`, null);
  }

  search(keyword: string, method: string) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/search/${keyword}/${method}`)
      .pipe(map(users => {
        return this.jsonConvert.deserializeArray(users, User);
      }));
  }

  deleteAccount(id: number, password: string) {
    const body = { id, password };
    const options = ({
      headers: new HttpHeaders({}),
      body
    });
    return this.http.delete(`${environment.apiUrl}/users/deleteAccount`, options);
  }

  forgotPassword(emailObject: object) {
    return this.http.post(`${environment.apiUrl}/users/forgot-password`, emailObject);
  }

  resetPassword(passwordObject: object, resetToken: string) {
    return this.http.post(`${environment.apiUrl}/users/reset-password/${resetToken}`, passwordObject);
  }
}
