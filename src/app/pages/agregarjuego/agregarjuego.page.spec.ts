import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarjuegoPage } from './agregarjuego.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

describe('AgregarjuegoPage', () => {
  let component: AgregarjuegoPage;
  let fixture: ComponentFixture<AgregarjuegoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarjuegoPage],
      providers: [
        ServiceBDService,
        { provide: SQLite }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarjuegoPage);
    component = fixture.componentInstance;

    // Simula la función presentToast y ahora puede estar el espia en mi spec.ts :)
    spyOn(component, 'presentToast').and.callFake(() => Promise.resolve());
  });

  it('El precio no puede ser negativo, de lo contrario no se puede agregar el juego', async () => {
  
    component.nombre = 'Call of Duty: Black Ops 6';
    component.precio = -21400;
    component.foto_producto = 'codbops6.jpg';
    component.stock = 5;

    
    await component.crear();

    
    expect(component.presentToast).toHaveBeenCalledWith('El precio no puede ser negativo.');
  });
});
