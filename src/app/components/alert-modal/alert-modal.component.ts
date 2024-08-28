//Importaciones de Angular
import { Component, EventEmitter, Input, Output } from '@angular/core';

//Interfaces
import { Vendedor } from './../../interfaces/vendedor.interface';

// Sevicios
import { VendedoresService } from '../../services/vendedores.service';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.css'],
})
export class AlertModalComponent {
  @Input() vendedor!: Vendedor;
  @Output() statusAlert = new EventEmitter<boolean>();
  @Output() operacionExitosa = new EventEmitter<void>();

  constructor(private vendedorService: VendedoresService) {}

  borrarUsuarioId() {
    this.vendedorService.deleteVendedor(this.vendedor.id!).subscribe(() => {
      this.statusAlert.emit(true);
      this.operacionExitosa.emit();
    });
  }

  cerrarAlert() {
    this.statusAlert.emit(false);
  }
}
