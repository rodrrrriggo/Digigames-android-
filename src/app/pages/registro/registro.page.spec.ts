import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { IonicModule } from '@ionic/angular';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()], // Importa ReactiveFormsModule para trabajar con formularios reactivos
      //ya que de lo contrario no podria trabajar con los formularios en esta prueba :(
      providers: [
        ServiceBDService,
        { provide: SQLite }, // Mock para SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Esta constante me sirve para poder inicializar los campos para poder comenzar la prueba
    const formBuilder = TestBed.inject(FormBuilder);
    component.form = formBuilder.group({
      nombre: [''],
      correo: [''],
      telefono: [''],
      contrasena: [''],
      confirmar_contrasena: [''],
      preguntaSeguridad: [''],
      respuestaSeguridad: [''],
    });
  });

  it('Se deberia validar el correo con un (@) correspondiente (dominio)', () => {
    const correoControl = component.form.get('correo');
    correoControl?.setValue('prueba@tudominio.com');
    expect(correoControl?.valid).toBeTrue(); // Valida correo correcto
  });
});
