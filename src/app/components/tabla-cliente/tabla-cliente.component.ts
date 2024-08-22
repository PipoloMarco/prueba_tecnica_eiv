import { Component, OnInit } from '@angular/core';
import { VendedoresService } from '../../services/vendedores.service';
import { Vendedor } from 'src/app/interfaces/vendedor.interface';

@Component({
  selector: 'app-tabla-cliente',
  templateUrl: './tabla-cliente.component.html',
  styleUrls: ['./tabla-cliente.component.css'],
})
export class TablaClienteComponent implements OnInit {
  constructor(private vendedoresSvc: VendedoresService) {}
  public vendedores: Vendedor[] = [];
  ngOnInit(): void {
    this.vendedoresSvc
      .getVendedores()
      .subscribe((value) => (this.vendedores = value));
  }
}
