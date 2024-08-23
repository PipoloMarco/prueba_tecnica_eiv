import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vendedor } from '../interfaces/vendedor.interface';
import { environment } from 'src/environments/environment';
import { Localidad } from '../interfaces/localidad.interface';

@Injectable({
  providedIn: 'root',
})
export class VendedoresService {
  constructor(private http: HttpClient) {}

  public baseUrl: string = environment.baseUrl;

  getVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(`${this.baseUrl}/api/vendedores`);
  }

  getLocalidades(): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(`${this.baseUrl}/api/localidades`);
  }

  postVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(`${this.baseUrl}/api/vendedores`, vendedor);
  }
}
