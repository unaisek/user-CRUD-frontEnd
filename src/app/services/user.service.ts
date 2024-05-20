import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IUser } from '../models/IUser';
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
}
