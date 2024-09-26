import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VistarolPage } from './vistarol.page';

describe('VistarolPage', () => {
  let component: VistarolPage;
  let fixture: ComponentFixture<VistarolPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VistarolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
