import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Localidad } from 'src/app/interfaces/localidad.interface';
import { Vendedor } from 'src/app/interfaces/vendedor.interface';
import { LocalidadesService } from 'src/app/services/localidades.service';
import { VendedoresService } from 'src/app/services/vendedores.service';

@Component({
  selector: 'app-modal-vendedor',
  templateUrl: './modal-vendedor.component.html',
  styleUrls: ['./modal-vendedor.component.css'],
})
export class ModalVendedorComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  public localidades: Localidad[] = [];
  public imgSet: any = '';
  @Output() closeModalEvent = new EventEmitter<boolean>();

  constructor(
    private form: FormBuilder,
    private vendedorService: VendedoresService,
    private localidadService: LocalidadesService
  ) {}

  public formulario = this.form.group({
    usuarioLogin: ['marquiito87', Validators.required],
    nombre: ['Marco', Validators.required],
    fechaNacimiento: [new Date(), Validators.required],
    localidadId: [1, Validators.required],
    observaciones: ['Hola como andas'],
    habilitado: [false, Validators.requiredTrue],
  });

  closeModal() {
    this.closeModalEvent.emit(); // Emitir el evento
  }
  ngOnInit(): void {
    this.localidadService
      .getLocalidades()
      .subscribe((value) => (this.localidades = value));
  }

  onSubmit() {
    if (this.formulario.invalid) {
      return console.log('formulario no es valido');
    }
    const vendedor = this.formulario.value as Vendedor;
    // return console.log(this.formulario.value);
    console.log('creado');
    return this.vendedorService.postVendedor(vendedor).subscribe();
  }

  uploadImage() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Imagen seleccionada:', file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSet = e.target.result;
        this.vendedorService.postFotoVendedor(7, file).subscribe();
      };
      reader.readAsDataURL(file); // Leer la imagen como una URL
    }
  }
}
