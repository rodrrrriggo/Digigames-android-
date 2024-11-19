import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerusuariosPage } from './verusuarios.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

describe('VerusuariosPage', () => {
  let component: VerusuariosPage;
  let fixture: ComponentFixture<VerusuariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerusuariosPage],
      providers: [
        ServiceBDService,
        { provide: SQLite}, // Usa el mock
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(VerusuariosPage);
    component = fixture.componentInstance;
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
