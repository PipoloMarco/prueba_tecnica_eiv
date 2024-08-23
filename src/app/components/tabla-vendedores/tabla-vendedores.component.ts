import { Component, Input, OnInit } from '@angular/core';
import { VendedoresService } from '../../services/vendedores.service';
import { Vendedor } from 'src/app/interfaces/vendedor.interface';
import { Localidad } from 'src/app/interfaces/localidad.interface';

@Component({
  selector: 'tabla-vendedores',
  templateUrl: './tabla-vendedores.component.html',
  styleUrls: ['./tabla-vendedores.component.css'],
})
export class TablaVendedoresComponent implements OnInit {
  constructor(private vendedoresSvc: VendedoresService) {}
  public vendedores: Vendedor[] = [];
  public localidades: Localidad[] = [];
  public estadoModal = false;

  ngOnInit(): void {
    this.vendedoresSvc
      .getVendedores()
      .subscribe((vendedors) => (this.vendedores = vendedors));
  }

  abrirModal() {
    this.estadoModal = !this.estadoModal;
    console.log(this.estadoModal);
  }

  cerrarCloseModal() {
    this.estadoModal = false;
  }
}
