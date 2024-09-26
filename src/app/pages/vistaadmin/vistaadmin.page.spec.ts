import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistaadminPage } from './vistaadmin.page';

describe('VistaadminPage', () => {
  let component: VistaadminPage;
  let fixture: ComponentFixture<VistaadminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistaadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
