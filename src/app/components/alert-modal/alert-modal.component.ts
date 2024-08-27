//Importaciones de Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

//Interfaces
import { Vendedor } from './../../interfaces/vendedor.interface';

// Sevicios
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
})
export class AlertModalComponent {
  @Input() vendedor!: Vendedor;
  @Output() statusAlert = new EventEmitter<boolean>();
  constructor(private vendedorService: VendedoresService) {}

  borrarUsuarioId() {
    console.log(this.vendedor);

    this.vendedorService
      .deleteVendedor(this.vendedor.id!)
      .subscribe(() => this.statusAlert.emit());
  }

  cerrarAlert() {
    console.log(this.statusAlert.emit());
    this.statusAlert.emit();
  }
}
