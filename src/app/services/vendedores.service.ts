import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  postVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(`${this.baseUrl}/api/vendedores`, vendedor);
  }

  postFotoVendedor(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file); // El primer argumento debe coincidir con el nombre esperado por el backend

    return this.http.post<Vendedor>(
      `${this.baseUrl}/api/vendedores/${id}/foto`,
      formData
    );
  }
  putVendedor(id: number, vendedor: Vendedor) {
    return this.http.put<Vendedor>(
      `${this.baseUrl}/api/vendedores/${id}`,
      vendedor
    );
  }
}
