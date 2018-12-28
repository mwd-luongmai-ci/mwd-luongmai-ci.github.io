import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { User } from '@app/_models';
import { map } from 'rxjs/operators';
import { JsonConvert } from 'json2typescript';

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
}
