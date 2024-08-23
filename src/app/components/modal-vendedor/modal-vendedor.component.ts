import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Vendedor } from 'src/app/interfaces/vendedor.interface';
import { VendedoresService } from 'src/app/services/vendedores.service';


@Component({
  selector: 'app-modal-vendedor',
  templateUrl: './modal-vendedor.component.html',
  styleUrls: ['./modal-vendedor.component.css'],
})
export class ModalVendedorComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(
    private form: FormBuilder,
    private vendedorService: VendedoresService
  ) {}
  public formulario = this.form.group({
    usuarioLogin: ['marquiito87', Validators.required],
    nombre: ['Marco', Validators.required],
    fechaNacimiento: [new Date(), Validators.required],
    localidadId: [1, Validators.required],
    observaciones: ['Hola como andas'],
    habilitado: [false, Validators.requiredTrue],
  });
  ngOnInit(): void {}

  onSubmit() {
    if (this.formulario.invalid) {
      return console.log('formulario no es valido');
    }
    const vendedor = this.formulario.value as Vendedor;
    // return console.log(this.formulario.value);
    console.log('creado');
    return this.vendedorService.postVendedor(vendedor).subscribe();
  }

  // {
  //   "fechaNacimiento": "2024-08-22",
  //   "habilitado": true,
  //   "localidadId": 1,
  //   "nombre": "maquito",
  //   "observaciones": "hola",
  //   "usuarioLogin": "maquito"
  // }

  // uploadImage() {
  //   this.fileInput.nativeElement.click();
  // }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     const file = input.files[0];
  //     console.log('Imagen seleccionada:', file);
  //     // Aquí puedes procesar el archivo seleccionado, por ejemplo, enviarlo a tu backend
  //   }
  // }
}
