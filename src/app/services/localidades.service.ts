import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Localidad } from '../interfaces/localidad.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalidadesService {
  constructor(private http: HttpClient) {}

  public baseUrl: string = environment.baseUrl;

  getLocalidades(): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(`${this.baseUrl}/api/localidades`);
  }
}
