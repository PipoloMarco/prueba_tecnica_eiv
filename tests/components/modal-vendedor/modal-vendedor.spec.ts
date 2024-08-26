import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalVendedorComponent } from '../../../src/app/components/modal-vendedor/modal-vendedor.component';

describe('ModalVendedorComponent', () => {
  let component: ModalVendedorComponent;
  let fixture: ComponentFixture<ModalVendedorComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ModalVendedorComponent],
  //     imports: [ReactiveFormsModule], // Asegúrate de importar ReactiveFormsModule si estás usando formularios reactivos
  //   }).compileComponents();
  // });

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ModalVendedorComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges(); // Dispara la detección de cambios para inicializar el componente
  // });

  // it('should initialize form with default values', () => {
  //   const formulario = component.formulario;
  //   expect(formulario).toBeDefined();
  //   expect(formulario.get('usuarioLogin')).toBeDefined();
  //   expect(formulario.get('nombre')).toBeDefined();
  //   expect(formulario.get('fechaNacimiento')).toBeDefined();
  //   expect(formulario.get('localidadId')).toBeDefined();
  //   expect(formulario.get('observaciones')).toBeDefined();
  //   expect(formulario.get('habilitado')).toBeDefined();
  // });

  // it('should have a valid form when all fields are filled correctly', () => {
  //   const formulario = component.formulario;
  //   formulario.patchValue({
  //     usuarioLogin: 'testuser',
  //     nombre: 'Test User',
  //     fechaNacimiento: '2000-01-01',
  //     localidadId: 1,
  //     observaciones: 'Test observations',
  //     habilitado: true,
  //   });
  // });
  // // Agrega más pruebas aquí según sea necesario
});
