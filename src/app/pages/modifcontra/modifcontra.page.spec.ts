import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifcontraPage } from './modifcontra.page';

describe('ModifcontraPage', () => {
  let component: ModifcontraPage;
  let fixture: ComponentFixture<ModifcontraPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifcontraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
