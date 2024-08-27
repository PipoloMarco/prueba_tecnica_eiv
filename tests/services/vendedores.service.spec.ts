import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { VendedoresService } from '../../src/app/services/vendedores.service';
import { of } from 'rxjs';

describe('Vendedores Services', () => {
  let service: VendedoresService;

  const mockVendedores = [
    {
      id: 1,
      usuarioLogin: 'marcoo',
      nombre: 'Perez, Anibal ',
      habilitado: true,
      fechaNacimiento: '1982-05-01',
      observaciones: null,
      localidad: {
        id: 1,
        localidad: 'Rosario',
        codigoPostal: '2000',
      },
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(VendedoresService);
  });

  test('Se crea el servicio', () => {
    expect(service).toBeTruthy();
  });

  test('debe de traer informacion del vendedor', (done) => {
    // Mock el servicio para que retorne el array de vendedores mockeados en vez de hacer la petición real
    jest.spyOn(service, 'getVendedores').mockReturnValue(of(mockVendedores));
    service.getVendedores().subscribe((vendedores) => {
      console.log(vendedores);
      expect(vendedores).toEqual(mockVendedores);
      expect(vendedores.length).toBeGreaterThan(0);
      expect(vendedores[0].nombre).toBe('Perez, Anibal ');
      done();
    });
  });

  test('debe devolver objetos con la estructura correcta', (done) => {
    jest.spyOn(service, 'getVendedores').mockReturnValue(of(mockVendedores));
    service.getVendedores().subscribe((vendedores) => {
      vendedores.forEach((vendedor) => {
        expect(vendedores).toEqual(mockVendedores);
        expect(vendedor).toHaveProperty('id');
        expect(vendedor).toHaveProperty('usuarioLogin');
        expect(vendedor).toHaveProperty('nombre');
        expect(vendedor).toHaveProperty('habilitado');
        expect(vendedor).toHaveProperty('observaciones');
        expect(vendedor).toHaveProperty('localidad');
      });
      done();
    });
  });

  test('Debe de traer la foto', () => {});
});
// "jest": {
//   "preset": "jest-preset-angular",
//   "setupFilesAfterEnv": [
//     "<rootDir>/setup-jest.ts"
//   ],

//   "globalSetup": "jest-preset-angular/global-setup"
// }
