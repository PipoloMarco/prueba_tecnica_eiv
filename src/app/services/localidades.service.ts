// Importaciones de Angular y RxJS

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//Interfaces
import { environment } from '../../environments/environment';
import { Localidad } from '../interfaces/localidad.interface';

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
