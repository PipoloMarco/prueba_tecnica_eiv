import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  public crearVendedor = true;
  public selectVendedor: Vendedor = {
    id: undefined,
    usuarioLogin: '',
    nombre: '',
    localidadId: 0,
    habilitado: false,
    fechaNacimiento: new Date(),
    observaciones: null,
  };

  ngOnInit(): void {
    this.vendedoresSvc
      .getVendedores()
      .subscribe((vendedor) => (this.vendedores = vendedor));
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
}
