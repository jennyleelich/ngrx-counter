import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../auth/authResponseData.model';
import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email:string, password: string):Observable<AuthResponseData> {
    https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
     return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIRBASE_API_KEY}`, 
        {email,password,returnSecureToken: true})
  }

  signUp(email:string, password: string):Observable<AuthResponseData> {
    https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
     return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIRBASE_API_KEY}`, 
        {email,password,returnSecureToken: true})
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.idToken, data.localId, expirationDate);
    return user;
  }

  getErrorMessage(message: string) {
    switch(message){
      case 'EMAIL_NOT_FOUND':
        return "Email not found";
      case 'INVALID_PASSWORD':
        return 'Invalid password';
      case 'EMAIL_EXISTS':
        return 'Email already exist';
      default:
        return 'Unknow error occured. please try again'
    }
  
  }
}
