import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

  private get apiUrl() {
    return environment.apiUrl + environment.urlEnding;
  }

  constructor(private httpClient: HttpClient) {
  }

  public getAllData(endpoint) {
    return this.httpClient.get<any>(this.apiUrl + endpoint)
      .map(response => response.data)
      .catch(err => Observable.throw(err));
  }

  public getFilteredData(endpoint, filter) {
    return this.httpClient.post<any>(this.apiUrl + endpoint + '/filter', filter)
      .map(response => response)
      .catch(err => Observable.throw(err));
  }

  public getDataById(endpoint, id): Observable<any> {
    endpoint = endpoint + '/' + id;
    return this.httpClient.get<any>(this.apiUrl + endpoint)
      .map(response => response.data)
      .catch(err => Observable.throw(err));
  }

  public postDataById(endpoint, id, payload): Observable<any> {
    endpoint = endpoint + '/' + id;
    return this.httpClient.post<any>(this.apiUrl + endpoint, payload)
      .map(response => response.data)
      .catch(err => Observable.throw(err));
  }

  public postData(endpoint, payload): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl + endpoint, payload)
      .map(response => response.data)
      .catch(err => Observable.throw(err));
  }

  public updateData(endpoint, payload): Observable<any> {
    return this.httpClient.put<any>(this.apiUrl + endpoint, payload)
      .map(response => response.data)
      .catch(err => Observable.throw(err));
  }

  public deleteData(endpoint, id): Observable<any> {
    endpoint = endpoint + '/' + id;
    return this.httpClient.delete<any>(this.apiUrl + endpoint)
      .map(response => response)
      .catch(err => Observable.throw(err));
  }
}
