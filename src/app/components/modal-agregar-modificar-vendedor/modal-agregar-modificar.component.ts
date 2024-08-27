//Importaciones de Angular  y Angular Forms
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//Servicios

import { LocalidadesService } from '../../services/localidades.service';
import { VendedoresService } from '../../services/vendedores.service';

//Interfaces

import { Localidad } from '../../interfaces/localidad.interface';
import { Vendedor } from '../../interfaces/vendedor.interface';

@Component({
  selector: 'modal-agregar-modificar-component',
  templateUrl: './modal-agregar-modificar.component.html',
  styleUrls: ['./modal-agregar-modificar.component.css'],
})
export class ModalAgregarModificarComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @Output() operacionExitosa = new EventEmitter<void>();
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() renderizar = new EventEmitter<any>();
  @Input() crearVendedor = true;
  @Input() vendedor = {};
  public fotoFile!: File;
  public localidades: Localidad[] = [];
  public imgSet: any;

  public formulario: FormGroup = this.form.group({
    usuarioLogin: ['', Validators.required],
    nombre: ['', Validators.required],
    fechaNacimiento: [
      new Date(),
      [Validators.required, this.vendedorService.edadValida()],
    ],
    localidadId: [null, Validators.required],
    observaciones: [''],
    habilitado: [true, Validators.required],
  });

  constructor(
    private form: FormBuilder,
    private vendedorService: VendedoresService,
    private localidadService: LocalidadesService
  ) {}

  ngOnInit(): void {
    // Traigo las localidades perticion y las muestro en el formulario
    this.localidadService
      .getLocalidades()
      .subscribe((value) => (this.localidades = value));
    // Si crearVendedor = falso entonces traigo los datos del vendedor;
    if (!this.crearVendedor) {
      this.formulario.patchValue(this.vendedor);
      this.traerFoto();
    }
  }

  // Validacion del formulario
  isValidField(field: string): boolean | null {
    return (
      this.formulario.controls[field].errors &&
      this.formulario.controls[field].touched
    );
  }

  // Toma La referencia de input file para manejarlo desde boton
  clickInputImage() {
    this.fileInput.nativeElement.click();
  }

  // Aplica la renderizacion del vendedor desde la tabla
  public rederVendedores() {
    this.renderizar.emit();
  }

  public modalStatusFalse() {
    this.cerrarModal.emit();
  }

  //Funcion de para crear el vendedor
  creoVendedor() {
    const vendedorForm = this.formulario.value as Vendedor;
    this.vendedorService.postVendedor(vendedorForm).subscribe(() => {
      this.modalStatusFalse();
      this.rederVendedores();
      this.operacionExitosa.emit();
    });
  }

  // Funcion para modificar el usuario
  modificoVendedor(event: Event) {
    const { id } = this.vendedor as Vendedor;
    const vendedor = this.formulario.value as Vendedor;
    const foto = this.fotoFile;

    this.vendedorService.putVendedor(id!, vendedor, foto).subscribe(() => {
      this.modalStatusFalse();
      this.rederVendedores();
      this.operacionExitosa.emit();
    });
  }

  // Funcion para traer las foto
  traerFoto() {
    const { id } = this.vendedor as Vendedor;
    // Obtencion de la foto desde el servicio
    this.vendedorService.getFotoVendedor(id!).subscribe((img) => {
      // Si no tiene la imagen esta nula setea una imagen por defecto
      if (img === null) {
        this.imgSet = '../../../assets/images/profileDefault.png';
        return;
      }
      //Creo una incia de FileReader para
      const reader = new FileReader();
      reader.onload = () => {
        this.imgSet = reader.result as string;
      };
      reader.readAsDataURL(img);
    });
  }

  // funcion para subir imagen desde input
  subirImagen(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imgSet = e.target.result;
        this.fotoFile = file;
        console.log(this.fotoFile);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(event: Event) {
    // Si el formulario es invalido...
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    // Si es el modal de modificacion entonces llamo al servicio para modificar el vendedor y retorno la funcion
    if (!this.crearVendedor) {
      this.modificoVendedor(event);
      return;
    }
    //Si no cumple las anterior condiciones creo el vendedor
    this.creoVendedor();
  }
}
