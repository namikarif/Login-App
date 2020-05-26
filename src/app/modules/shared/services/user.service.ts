import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '@env/environment';

@Injectable()
export class UserService {
  private baseUrl() {
    return environment.apiUrl + '/';
  }

  constructor(private http: HttpClient) {
  }

  my(token?: string): Observable<any> {
    return token ?
      this.http.get<any>(this.baseUrl() + '/user/my', {headers: new HttpHeaders().set('Www-Authorization', 'Bearer ' + token)}) :
      this.http.get<any>(this.baseUrl() + '/user/my');
  }
}
