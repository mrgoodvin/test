import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FbService {
  private map = new Map();

  constructor(private http: HttpClient) {
  }

  getAll<T>(pathUrl: string = '/users.json'): Observable<T[]> {
    if (this.map.has(pathUrl)) {
      return this.map.get(pathUrl);
    }
    const o: Observable<T[]> =
      this.http.get(`${environment.fbUrl}` + pathUrl)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
          }));
      }));
    this.map.set(pathUrl, o);
    return o;
  }

  getByUKey<T>(pathUrl: string): Observable<T> {
    if (this.map.has(pathUrl)) {
      return this.map.get(pathUrl);
    }
    const o: Observable<T> =
    this.http.get<T>(`${environment.fbUrl}` + pathUrl)
      .pipe(map((data: T) => {
        return {
          ...data
        };
      }));
    this.map.set(pathUrl, o);
    return o;
  }
}
