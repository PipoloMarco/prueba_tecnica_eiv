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
  public imgSet: any;
  @Output() cerrarModal = new EventEmitter<boolean>();
  @Input() crearVendedor = true;
  @Input() vendedor = {};

  public formulario: FormGroup = this.form.group({
    usuarioLogin: ['', Validators.required],
    nombre: ['', Validators.required],
    fechaNacimiento: [new Date(), Validators.required],
    localidadId: [1, Validators.required],
    observaciones: [''],
    habilitado: [false, Validators.requiredTrue],
  });

  public modalStatusFalse() {
    this.cerrarModal.emit();
  }

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

  onSubmit(event: Event) {
    // Si el formulario es invalido...
    if (this.formulario.invalid) {
      return console.log('formulario no es valido');
    }
    // Si es el modal de modificacion entonces llamo al servicio para modificar el vendedor y retorno la funcion
    if (!this.crearVendedor) {
      const { id } = this.vendedor as Vendedor;
      const vendedor = this.formulario.value as Vendedor;
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        console.log('Imagen seleccionada:', file);

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imgSet = e.target.result;
          this.vendedorService.postFotoVendedor(id!, file).subscribe();
        };
        reader.readAsDataURL(file);
      }

      return this.vendedorService.putVendedor(id!, vendedor).subscribe();
    }
    //Si no cumple las anterior condiciones creo el vendedor
    const vendedorForm = this.formulario.value as Vendedor;
    this.modalStatusFalse();
    return this.vendedorService.postVendedor(vendedorForm).subscribe();
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

  uploadImage() {
    this.fileInput.nativeElement.click();
  }

  isValidField(field: string): boolean | null {
    return (
      this.formulario.controls[field].errors &&
      this.formulario.controls[field].touched
    );
  }
}
