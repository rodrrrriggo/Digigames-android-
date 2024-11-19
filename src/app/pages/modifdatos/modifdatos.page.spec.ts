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
        { provide: SQLite}, // Usa el mock
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ModifdatosPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
