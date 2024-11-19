import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProbarapiPage } from './probarapi.page';
import { HttpClientModule } from '@angular/common/http';

describe('ProbarapiPage', () => {
  let component: ProbarapiPage;
  let fixture: ComponentFixture<ProbarapiPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], // Importa HttpClientModule aquí
      declarations: [ProbarapiPage],
    }).compileComponents();

    const fixture = TestBed.createComponent(ProbarapiPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
