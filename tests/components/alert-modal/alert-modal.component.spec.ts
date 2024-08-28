import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { VendedoresService } from '../../../src/app/services/vendedores.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AlertModalComponent } from '../../../src/app/components/alert-modal/alert-modal.component';
import { Vendedor } from '../../../src/app/interfaces/vendedor.interface';

describe('AlertModalComponent', () => {
  let component: AlertModalComponent;
  let fixture: ComponentFixture<AlertModalComponent>;
  let vendedorService: VendedoresService;
  let httpTestingController: HttpTestingController;

  const mockVendedor: Vendedor = {
    id: 1,
    usuarioLogin: 'testUser',
    nombre: 'Test User',
    fechaNacimiento: '1990-01-01',
    localidad: { id: 1, localidad: 'Test Localidad', codigoPostal: '20024' },
    habilitado: true,
    observaciones: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AlertModalComponent],
      providers: [VendedoresService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertModalComponent);
    component = fixture.componentInstance;
    vendedorService = TestBed.inject(VendedoresService);
    httpTestingController = TestBed.inject(HttpTestingController);

    component.vendedor = mockVendedor;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Verifica que no haya solicitudes HTTP pendientes
    httpTestingController.verify();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a deleteVendedor y emitir statusAlert con true en la eliminación exitosa', () => {
    // Segumiento al método deleteVendedor y simula una respuesta exitosa
    jest.spyOn(vendedorService, 'deleteVendedor').mockReturnValue(of({}));

    // Segumiento al método emit del EventEmitter
    const emitSpy = jest.spyOn(component.statusAlert, 'emit');

    // Llama al método borrarUsuarioId que debería eliminar el vendedor
    component.borrarUsuarioId();

    // Verifica que deleteVendedor se haya llamado con el ID correcto
    expect(vendedorService.deleteVendedor).toHaveBeenCalledWith(
      mockVendedor.id
    );

    // Verifica que se haya llamado a emit con el valor true
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('debería emitir statusAlert con false al cerrar la alerta', () => {
    // Segumiento el método emit del EventEmitter
    const emitSpy = jest.spyOn(component.statusAlert, 'emit');

    // Llama al método cerrarAlert que debería emitir false
    component.cerrarAlert();

    // Verifica que se haya llamado a emit con el valor false
    expect(emitSpy).toHaveBeenCalledWith(false);
  });
});
