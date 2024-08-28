//Modulos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

//Declarations
import { AlertModalComponent } from './components/alert-modal/alert-modal.component';
import { AppComponent } from './app.component';

import { TablaVendedoresComponent } from './components/tabla-vendedores/tabla-vendedores.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ModalAgregarModificarComponent } from './components/modal-agregar-modificar-vendedor/modal-agregar-modificar.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AlertModalComponent,
    AppComponent,
    ModalAgregarModificarComponent,
    TablaVendedoresComponent,
    ToastsComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
