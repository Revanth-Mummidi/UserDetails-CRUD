import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserType {
  _id: undefined | string;
  firstname: string;
  email: string;
  lastname: string;
  dob: string;
  description:string;
  gender: string;
}

interface UserResponse {
  message: string;
  data: UserType[] ;
}


const base_url='http://localhost:3000/api/users';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  constructor(private http: HttpClient) {
   }
  

  getAllUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(base_url);
  }

  createUser(user: UserType): Observable<any> {
    return this.http.post<any>(base_url, user);
  }

  updateUser(user: UserType): Observable<UserResponse> {
    return this.http.put<UserResponse>(`${base_url}/${user._id}`, user);
  }

  deleteUser(id: string): Observable<UserResponse> {
    return this.http.delete<UserResponse>(`${base_url}/${id}`);
  }

}
