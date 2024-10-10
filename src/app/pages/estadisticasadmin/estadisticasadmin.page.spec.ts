import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadisticasadminPage } from './estadisticasadmin.page';

describe('EstadisticasadminPage', () => {
  let component: EstadisticasadminPage;
  let fixture: ComponentFixture<EstadisticasadminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
