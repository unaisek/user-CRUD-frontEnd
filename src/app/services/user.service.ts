import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IUser,ApiResponse } from '../models/IUser';
import { Observable } from 'rxjs';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http:HttpClient
  ){}

  registerUser(userData:IUser): Observable<IUser> {
    return this._http.post<IUser>(`${env.apiUrl}/user/register`,userData)
  }

  getAllUsers(): Observable<ApiResponse<IUser[]>>{
    return this._http.get<ApiResponse<IUser[]>>(`${env.apiUrl}/user/all-users`);
  }

  updateUser(userId:string, userData:IUser): Observable<ApiResponse<IUser>>{
    return this._http.post<ApiResponse<IUser>>(`${env.apiUrl}/user/update/${userId}`,userData)
  }
}
