// Importaciones de Angular y RxJS

import { AbstractControl, ValidatorFn } from '@angular/forms';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Interfaces

import { Vendedor } from '../interfaces/vendedor.interface';

// Configuración variable de entorno

import { environment } from '../../environments/environment';

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
    return this.http
      .post<Vendedor>(`${this.baseUrl}/api/vendedores`, vendedor)
      .pipe(catchError(this.handleError));
  }

  postFotoVendedor(id: number, file: File): Observable<Vendedor> {
    const formData = new FormData();
    formData.append('file', file);
    // El primer argumento debe coincidir con el nombre esperado por el backend

    return this.http
      .post<Vendedor>(`${this.baseUrl}/api/vendedores/${id}/foto`, formData)
      .pipe(catchError(this.handleError));
  }

  getFotoVendedor(id: number): Observable<Blob> {
    return this.http
      .get(`${this.baseUrl}/api/vendedores/${id}/foto`, {
        responseType: 'blob',
      })
      .pipe(catchError(this.handleError));
  }

  putVendedor(
    id: number,
    vendedor: Vendedor,
    foto: File
  ): Observable<Vendedor> {
    if (foto) {
      this.postFotoVendedor(id!, foto).subscribe();
    }
    return this.http
      .put<Vendedor>(`${this.baseUrl}/api/vendedores/${id}`, vendedor)
      .pipe(catchError(this.handleError));
  }

  deleteVendedor(id: number): Observable<Object> {
    return this.http
      .delete(`${this.baseUrl}/api/vendedores/${id}`)
      .pipe(catchError(this.handleError));
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
  edadValida(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const fechaNacimiento = control.value;

      const fecha = new Date(fechaNacimiento);
      const hoy = new Date();
      const edad = hoy.getFullYear() - fecha.getFullYear();
      const mes = hoy.getMonth() - fecha.getMonth();
      const dia = hoy.getDate() - fecha.getDate();

      const edadValida =
        edad > 18 || (edad === 18 && (mes > 0 || (mes === 0 && dia >= 0)));
      const edadLimite =
        edad < 65 || (edad === 65 && (mes < 0 || (mes === 0 && dia <= 0)));
      return edadValida && edadLimite ? null : { edadNoValida: true };
    };
  }
}
