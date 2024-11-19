import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticasadminPage } from './estadisticasadmin.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

describe('EstadisticasadminPage', () => {
  let component: EstadisticasadminPage;
  let fixture: ComponentFixture<EstadisticasadminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadisticasadminPage],
      providers: [
        ServiceBDService,
        { provide: SQLite}, // Usa el mock
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(EstadisticasadminPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
