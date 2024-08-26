import { Vendedor } from './../../interfaces/vendedor.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VendedoresService } from '../../services/vendedores.service';
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
  public crearVendedor = true;
  public selectVendedor!: Vendedor;
  public eliminarOpcion = false;
  public estadoToast = false;

  ngOnInit(): void {
    this.cargoVendedores();
  }

  cargoVendedores() {
    this.vendedoresSvc
      .getVendedores()
      .subscribe((vendedor) => (this.vendedores = vendedor));
    console.log('cargo vendedores');
  }

  abrirModal() {
    this.estadoModal = true;
  }

  cerrarModal() {
    this.estadoModal = false;
  }

  agregarVendedor() {
    this.crearVendedor = true;
    this.abrirModal();
  }

  modificarVendedor(vendedor: Vendedor) {
    this.selectVendedor = vendedor;
    this.crearVendedor = false;
    this.abrirModal();
  }

  abrirModalEliminacion(vendedor: Vendedor) {
    this.eliminarOpcion = true;
    this.selectVendedor = vendedor;
  }

  confirmarEliminacion() {
    this.eliminarOpcion = false;
    this.cargoVendedores();
  }

  muestroToast() {
    this.estadoToast = true;
    setTimeout(() => {
      this.estadoToast = false;
    }, 1000);
  }
}
