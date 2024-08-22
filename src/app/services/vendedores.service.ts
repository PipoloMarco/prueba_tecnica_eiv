import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Vendedor } from '../interfaces/vendedor.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VendedoresService {
  constructor(private http: HttpClient) {}
  public baseUrl: string = environment.baseUrl;

  getVendedores(): Observable<Vendedor[]> {
    return this.http.get<Vendedor[]>(`${this.baseUrl}/api/vendedores`);
  }
}
