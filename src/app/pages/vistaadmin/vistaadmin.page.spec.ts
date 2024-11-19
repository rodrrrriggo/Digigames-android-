import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaadminPage } from './vistaadmin.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

describe('VistaadminPage', () => {
  let component: VistaadminPage;
  let fixture: ComponentFixture<VistaadminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VistaadminPage],
      providers: [
        ServiceBDService,
        { provide: SQLite}, // Usa el mock
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(VistaadminPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
