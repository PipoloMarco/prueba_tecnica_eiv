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
import { Observable } from 'rxjs';
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
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Output() renderizar = new EventEmitter<any>();
  @Input() crearVendedor = true;
  @Input() vendedor = {};
  public fotoFile!: File;
  public localidades: Localidad[] = [];
  public imgSet: any;

  public toastVariable = {
    creacion: false,
    mensaje: 'Mensaje',
  };
  public formulario: FormGroup = this.form.group({
    usuarioLogin: ['', Validators.required],
    nombre: ['', Validators.required],
    fechaNacimiento: [new Date(), Validators.required],
    localidadId: [1, Validators.required],
    observaciones: [''],
    habilitado: [true, Validators.required],
  });

  constructor(
    private form: FormBuilder,
    private vendedorService: VendedoresService,
    private localidadService: LocalidadesService
  ) {}

  ngOnInit(): void {
    this.localidadService
      .getLocalidades()
      .subscribe((value) => (this.localidades = value));
    // Si crearVendedor = falso entonces traigo los datos del vendedor;
    if (!this.crearVendedor) {
      this.formulario.patchValue(this.vendedor);
      this.traerFoto();
    }
  }
  public rederVendedores() {
    this.renderizar.emit();
  }

  public modalStatusFalse() {
    this.cerrarModal.emit();
  }
  onSubmit(event: Event) {
    // Si el formulario es invalido...
    if (this.formulario.invalid) {
      return console.log('formulario no es valido');
    }
    // Si es el modal de modificacion entonces llamo al servicio para modificar el vendedor y retorno la funcion
    if (!this.crearVendedor) {
      this.modificoVendedor(event);
      return;
    }
    //Si no cumple las anterior condiciones creo el vendedor
    this.creoVendedor();
  }

  creoVendedor() {
    const vendedorForm = this.formulario.value as Vendedor;
    this.vendedorService.postVendedor(vendedorForm).subscribe(() => {
      this.modalStatusFalse();
      this.rederVendedores();
    });
  }

  modificoVendedor(event: Event) {
    const { id } = this.vendedor as Vendedor;
    const vendedor = this.formulario.value as Vendedor;
    const foto = this.fotoFile;

    this.vendedorService.putVendedor(id!, vendedor, foto).subscribe(() => {
      this.modalStatusFalse();
      this.rederVendedores();
    });
  }

  traerFoto() {
    const { id } = this.vendedor as Vendedor;

    this.vendedorService.getFotoVendedor(id!).subscribe((img) => {
      // Si no tiene la imagen esta nula setea una imagen por decfecto
      if (img === null) {
        this.imgSet = '../../../assets/images/profileDefault.png';
        return;
      }
      //Todo ver como comentar
      const reader = new FileReader();
      reader.onload = () => {
        this.imgSet = reader.result as string;
      };
      reader.readAsDataURL(img);
    });
  }

  clickInputImage() {
    this.fileInput.nativeElement.click();
  }

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
  isValidField(field: string): boolean | null {
    return (
      this.formulario.controls[field].errors &&
      this.formulario.controls[field].touched
    );
  }
}
