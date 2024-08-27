import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAgregarModificarComponent } from '../../src/app/components/modal-agregar-modificar-vendedor/modal-agregar-modificar.component';
import { FormBuilder } from '@angular/forms';
import { VendedoresService } from '../../src/app/services/vendedores.service';
import { LocalidadesService } from '../../src/app/services/localidades.service';
import { of } from 'rxjs';
import { Localidad } from '../../src/app/interfaces/localidad.interface';

describe('ModalAgregarModificarComponent', () => {
  let component: ModalAgregarModificarComponent;
  let fixture: ComponentFixture<ModalAgregarModificarComponent>;
  let vendedorService: VendedoresService;
  let localidadService: LocalidadesService;

  beforeEach(async () => {
    // Configuración del entorno de pruebas
    await TestBed.configureTestingModule({
      declarations: [ModalAgregarModificarComponent],
      providers: [
        FormBuilder,
        {
          provide: VendedoresService,
          useValue: {
            postVendedor: jest.fn(),
            putVendedor: jest.fn(),
            getFotoVendedor: jest.fn(),
          },
        },
        {
          provide: LocalidadesService,
          useValue: { getLocalidades: jest.fn() },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarModificarComponent);
    component = fixture.componentInstance;
    vendedorService = TestBed.inject(VendedoresService);
    localidadService = TestBed.inject(LocalidadesService);

    fixture.detectChanges();
  });
});
