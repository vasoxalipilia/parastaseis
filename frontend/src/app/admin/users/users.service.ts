import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserTotal } from 'src/app/user/interfaces/user.interface';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.BASE_URL + '/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<any>(`${BACKEND_URL}/all`, {
      withCredentials: true,
    });
  }

  updateUser(user: UserTotal, role: string) {
    return this.httpClient.put<any>(
      `${BACKEND_URL}/role/${role}`,
      { user },
      {
        withCredentials: true,
      }
    );
  }
}
