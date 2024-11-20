import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifdatosPage } from './modifdatos.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

describe('ModifdatosPage', () => {
  let component: ModifdatosPage;
  let fixture: ComponentFixture<ModifdatosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifdatosPage],
      providers: [
        ServiceBDService,
        { provide: SQLite }, // Usa el mock
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(ModifdatosPage);
    component = fixture.componentInstance;
  
    //Este componente se inicializa en ngOnInit, entonces yo le pase el parametro para aca para
    //que se pueda simular/inicializar correctamente
    component.ngOnInit();
  });


  it('El campo nombre no puede contener caracteres especiales, de lo contrario no se puede modificar', () => {
    // Establecer un valor no válido para el campo 'nombre'
    component.editUserForm.controls['nombre'].setValue('Rodrigo34@._');
  
    expect(component.editUserForm.controls['nombre'].valid).toBeFalse();
   
    expect(component.editUserForm.controls['nombre'].errors?.['pattern']).toBeTruthy();

    const errorMessage = component.getNombreError();
    expect(errorMessage).toBe('El campo "Nombre" no puede contener numeros ni caracteres especiales.');
  });
});
