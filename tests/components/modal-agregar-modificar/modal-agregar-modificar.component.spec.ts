import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ModalAgregarModificarComponent } from '../../../src/app/components/modal-agregar-modificar-vendedor/modal-agregar-modificar.component';
import { VendedoresService } from '../../../src/app/services/vendedores.service';
import { LocalidadesService } from '../../../src/app/services/localidades.service';
VendedoresService;

describe('ModalAgregarModificarComponent', () => {
  // Defino las varialbles
  let component: ModalAgregarModificarComponent;
  let fixture: ComponentFixture<ModalAgregarModificarComponent>;
  let mockVendedoresService: any;
  let mockLocalidadesService: any;

  beforeEach(async () => {
    // Mock de VendedoresService
    mockVendedoresService = {
      postVendedor: jest.fn().mockReturnValue(of({})),
      edadValida: jest.fn().mockReturnValue(() => null),
      getFotoVendedor: jest.fn().mockReturnValue(of('')),
      putVendedor: jest.fn().mockReturnValue(of({})),
    };

    // Mock de LocalidadesService
    mockLocalidadesService = {
      getLocalidades: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ModalAgregarModificarComponent],
      providers: [
        { provide: VendedoresService, useValue: mockVendedoresService },
        { provide: LocalidadesService, useValue: mockLocalidadesService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalAgregarModificarComponent);
    component = fixture.componentInstance;
  });

  it('tendria que crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('llamar a creoVendedor cuando se envía un formulario válido en modo crear', () => {
    // Cambio el estado a true para saber que el usuario quires crear un vendedor
    component.crearVendedor = true;

    // Seguimiento del crear vendedor

    const seguimientoCreoVendedor = jest.spyOn(component, 'creoVendedor');

    // Simulo el relleno del furmulario a testiar

    component.formulario.patchValue({
      usuarioLogin: 'marco96',
      nombre: 'Marco Pipolo',
      habilitado: true,
      fechaNacimiento: '1997-11-28',
      observaciones: 'front-end',
      localidadId: 1,
    });

    // Dectar si lo cambios fueron echos

    fixture.detectChanges();

    // Envio de datos
    component.onSubmit(new Event('submit'));

    //Dectecto si los cambios cuando se envio el formulario
    expect(seguimientoCreoVendedor).toHaveBeenCalled();

    // verifico que si el formulario es valido
    expect(component.formulario.valid).toBe(true);
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('no debería llamar a creoVendedor si el formulario es inválido', () => {
    // Cambio el estado a true para saber que el usuario quires crear un vendedor

    component.crearVendedor = true;

    // Seguimiento del crear vendedor

    const spyCreoVendedor = jest.spyOn(component, 'creoVendedor');

    // Simulo el relleno del furmulario a testiar con campos basios

    component.formulario.patchValue({
      usuarioLogin: '',
      nombre: 'Test User',
      fechaNacimiento: '1990-01-01',
      localidadId: '',
      observaciones: '',
      habilitado: null,
    });

    // Dectar si lo cambios fueron echos
    fixture.detectChanges();

    // Envio de datos
    component.onSubmit(new Event('submit'));

    // Verifico si el llamados a enviar no fueron ejecutados

    expect(spyCreoVendedor).not.toHaveBeenCalled();

    // Verifico si el formulario es invalido
    expect(component.formulario.invalid).toBe(true);
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('marcar todos los campos como tocados si el formulario es inválido', () => {
    component.crearVendedor = true; // Modo crear vendedor
    const spyMarkAllAsTouched = jest.spyOn(
      component.formulario,
      'markAllAsTouched'
    );

    // Simulo el relleno del furmulario a testiar con campos basios
    component.formulario.patchValue({
      usuarioLogin: '',
      nombre: '',
      fechaNacimiento: '',
      localidadId: '',
      observaciones: '',
      habilitado: null,
    });
    // Dectar si lo cambios fueron echos

    fixture.detectChanges();

    // Envio de datos

    component.onSubmit(new Event('submit'));

    // verifico si los cambios fueron llamados

    expect(spyMarkAllAsTouched).toHaveBeenCalled();
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it(' llamar a postVendedor con los datos correctos cuando el formulario es válido', () => {
    // Cambio el estado a true para saber que el usuario quires crear un vendedor
    component.crearVendedor = true;

    // Simulo el relleno del furmulario a testiar con campos basios
    const datosEsperados = {
      usuarioLogin: 'marco96',
      nombre: 'Marco Pipolo',
      habilitado: true,
      fechaNacimiento: '1997-11-28',
      observaciones: 'front-end',
      localidadId: 1,
    };

    // Completo los campos del mock de los datos esperados
    component.formulario.patchValue(datosEsperados);
    // Dectar si lo cambios fueron echos
    fixture.detectChanges();
    // Envio de datos

    component.onSubmit(new Event('submit'));

    // Detecto si los datos esperado fueron enviados en el post
    expect(mockVendedoresService.postVendedor).toHaveBeenCalledWith(
      datosEsperados
    );
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('debería llamar a modificoVendedor cuando se envía un formulario válido en modo modificar', () => {
    // Configuración para modo de modificación
    component.crearVendedor = false;
    component.vendedor = {
      id: 1,
      usuarioLogin: 'marco96',
      nombre: 'Marco Pipolo',
      habilitado: true,
      fechaNacimiento: '1997-11-28',
      observaciones: 'front-end',
      localidadId: 1,
    };

    // Seguimiento del modificar vendedor
    const spyModificoVendedor = jest.spyOn(component, 'modificoVendedor');

    // Simulo el relleno del formulario a testear
    component.formulario.patchValue({
      usuarioLogin: 'marco96',
      nombre: 'Marco Pipolo',
      habilitado: true,
      fechaNacimiento: '1997-11-28',
      observaciones: 'front-end',
      localidadId: 1,
    });

    fixture.detectChanges();

    // Envio de datos
    component.onSubmit(new Event('submit'));

    // Verifico si el método fue llamado
    expect(spyModificoVendedor).toHaveBeenCalled();

    // Verifico si el formulario es válido
    expect(component.formulario.valid).toBe(true);
    expect(fixture.debugElement.nativeElement).toMatchSnapshot();
  });

  it('debería llamar a putVendedor con los datos correctos cuando el formulario es válido en modo modificar y la foto a subir', () => {
    // Configuración para modo de modificación
    component.crearVendedor = false;
    component.vendedor = {
      id: 1,
      usuarioLogin: 'marco96',
      nombre: 'Marco Pipolo',
      habilitado: true,
      fechaNacimiento: '1997-11-28',
      observaciones: 'front-end',
      localidadId: 1,
    };

    // Simula el relleno del formulario
    const datosEsperados = {
      usuarioLogin: 'marco96',
      nombre: 'Marco Pipolo',
      habilitado: true,
      fechaNacimiento: '1997-11-28',
      observaciones: 'front-end',
      localidadId: 1,
    };

    // Simula una foto como un Blob
    const fotoSimulada = new Blob([], { type: 'image/png' });

    // Simular el método para obtener la imagen
    jest.spyOn(component, 'traerFoto').mockImplementation(() => {
      component.fotoFile = fotoSimulada as File;
    });

    component.formulario.patchValue(datosEsperados);
    fixture.detectChanges();

    // Envio de datos
    component.onSubmit(new Event('submit'));

    // Verifica si el método putVendedor fue llamado con los datos correctos
    expect(mockVendedoresService.putVendedor).toHaveBeenCalledWith(
      1,
      datosEsperados,
      fotoSimulada
    );
  });
  it('debería actualizar el formulario y reflejar los cambios en el componente y si puede modificar aunque la foto este nula', () => {
    // Inicializa el componente en modo de modificación
    component.crearVendedor = false;

    // Usuario a modificar
    component.vendedor = {
      id: 1,
      usuarioLogin: 'olduser',
      nombre: 'Old User',
      habilitado: false,
      fechaNacimiento: '1980-01-01',
      observaciones: 'Old observation',
      localidadId: 1,
    };
    // Asegúrate de que el componente se haya inicializado correctamente
    fixture.detectChanges();

    // Usuario a modificado
    const formulario = component.formulario;
    formulario.patchValue({
      usuarioLogin: 'updateduser',
      nombre: 'Updated User',
      fechaNacimiento: '1990-01-01',
      localidadId: 1,
      observaciones: 'Updated observation',
      habilitado: true,
    });

    // Verifica que los valores del formulario se hayan actualizado
    expect(formulario.value).toEqual({
      usuarioLogin: 'updateduser',
      nombre: 'Updated User',
      fechaNacimiento: '1990-01-01',
      localidadId: 1,
      observaciones: 'Updated observation',
      habilitado: true,
    });

    // Verifica que la fotoFile no haya sido modificada (si corresponde)
    console.log('Estado de fotoFile:', component.fotoFile);

    console.log('FotoFile:', component.fotoFile);
    expect(component.fotoFile).toBeUndefined(); // Asumiendo que no se ha subido ninguna foto aún

    // Simula el envío del formulario
    component.onSubmit(new Event('submit'));

    // Verifica que el servicio `putVendedor` fue llamado con los datos actualizados
    console.log('Formulario actualizado:', formulario.value);
    console.log(
      'Llamada a putVendedor:',
      mockVendedoresService.putVendedor.mock.calls
    );

    const expectedVendedor = {
      usuarioLogin: 'updateduser',
      nombre: 'Updated User',
      habilitado: true,
      fechaNacimiento: '1990-01-01',
      observaciones: 'Updated observation',
      localidadId: 1,
    };

    expect(mockVendedoresService.putVendedor).toHaveBeenCalledWith(
      1,
      expectedVendedor,
      undefined
    );
  });
});
