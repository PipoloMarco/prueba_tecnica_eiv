import { Component, OnInit } from '@angular/core';
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
  ngOnInit(): void {
    this.vendedoresSvc
      .getVendedores()
      .subscribe((vendedors) => (this.vendedores = vendedors));
    this.vendedoresSvc
      .getLocalidades()
      .subscribe((localidades) => (this.localidades = localidades));
  }
}
