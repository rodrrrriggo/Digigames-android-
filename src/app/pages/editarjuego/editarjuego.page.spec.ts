import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarjuegoPage } from './editarjuego.page';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';
import { of } from 'rxjs';

// Estos son Mocks de SQLite
// en el cual simulamos la creacion de la BD, es decir retornar un observable simulado.
class SQLiteMock {
  create() {
    return of(null);  
  }
}

describe('EditarjuegoPage', () => {
  let component: EditarjuegoPage;
  let fixture: ComponentFixture<EditarjuegoPage>;

  // Los params, queryParams, fragment, data, url y routeConfig Simulan las propiedades de ActivatedRoute, que justamente me pidio 
  // antes para poder usarlas en el constructor, de lo contrario no se podia usar
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarjuegoPage],
      providers: [
        ServiceBDService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: { get: (key: string) => '1' }  // Simula paramMap.get('id')
            },
            params: of({ id: '1' }), 
            queryParams: of({}),  
            fragment: of(''), 
            data: of({}),  
            url: of([]),  
            routeConfig: {}  
          }
        },
        { provide: SQLite, useClass: SQLiteMock },  // Mock de SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarjuegoPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
