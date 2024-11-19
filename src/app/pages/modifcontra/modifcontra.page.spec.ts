import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifcontraPage } from './modifcontra.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServiceBDService } from 'src/app/services/service-bd.service';

describe('ModifcontraPage', () => {
  let component: ModifcontraPage;
  let fixture: ComponentFixture<ModifcontraPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModifcontraPage],
      providers: [
        ServiceBDService,
        { provide: SQLite}, // Usa el mock
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ModifcontraPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
