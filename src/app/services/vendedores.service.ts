import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Vendedor } from '../interfaces/vendedor.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VendedoresService {
  constructor(private http: HttpClient) {}
  public baseUrl: string = environment.baseUrl;

  getVendedores(): Observable<Vendedor[]> {
    return this.http
      .get<Vendedor[]>(`${this.baseUrl}/api/vendedores`)
      .pipe(catchError(this.handleError));
  }
  postVendedor(vendedor: Vendedor): Observable<Vendedor> {
    return this.http.post<Vendedor>(`${this.baseUrl}/api/vendedores`, vendedor);
  }

  postFotoVendedor(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file); // El primer argumento debe coincidir con el nombre esperado por el backend

    return this.http
      .post<Vendedor>(`${this.baseUrl}/api/vendedores/${id}/foto`, formData)
      .pipe(catchError(this.handleError));
  }

  getFotoVendedor(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/api/vendedores/${id}/foto`, {
      responseType: 'blob',
    });
  }

  putVendedor(id: number, vendedor: Vendedor, foto: File) {
    if (foto) {
      this.postFotoVendedor(id!, foto).subscribe();
    }
    return this.http
      .put<Vendedor>(`${this.baseUrl}/api/vendedores/${id}`, vendedor)
      .pipe(catchError(this.handleError));
  }

  deleteVendedor(id: number) {
    return this.http.delete(`${this.baseUrl}/api/vendedores/${id}`);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Código de estado: ${error.status}\nMensaje: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
