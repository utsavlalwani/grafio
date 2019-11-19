import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegisterStepperComponent } from './company-register-stepper.component';

describe('CompanyRegisterStepperComponent', () => {
  let component: CompanyRegisterStepperComponent;
  let fixture: ComponentFixture<CompanyRegisterStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegisterStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegisterStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
