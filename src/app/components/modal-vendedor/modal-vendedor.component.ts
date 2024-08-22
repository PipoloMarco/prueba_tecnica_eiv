import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-vendedor',
  templateUrl: './modal-vendedor.component.html',
  styleUrls: ['./modal-vendedor.component.css'],
})
export class ModalVendedorComponent implements OnInit {
  constructor(private form: FormBuilder) {}
  public formulario = this.form.group({
    name: ['Marco'],
    apellido: ['Pipolo'],
    fechaNacimiento: [''],
    localidad: [''],
    observacion: [''],
    habilitado: [''],
  });
  ngOnInit(): void {}
}
