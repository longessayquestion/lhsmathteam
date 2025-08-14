import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IctmPage } from './ictm.page';

describe('IctmPage', () => {
  let component: IctmPage;
  let fixture: ComponentFixture<IctmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IctmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
