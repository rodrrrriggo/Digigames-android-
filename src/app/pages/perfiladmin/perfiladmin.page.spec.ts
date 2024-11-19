import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfiladminPage } from './perfiladmin.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

describe('PerfiladminPage', () => {
  let component: PerfiladminPage;
  let fixture: ComponentFixture<PerfiladminPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfiladminPage],
      providers: [
        ServiceBDService,
        { provide: SQLite}, // Usa el mock
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(PerfiladminPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
