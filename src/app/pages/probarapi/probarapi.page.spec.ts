import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProbarapiPage } from './probarapi.page';

describe('ProbarapiPage', () => {
  let component: ProbarapiPage;
  let fixture: ComponentFixture<ProbarapiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProbarapiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
