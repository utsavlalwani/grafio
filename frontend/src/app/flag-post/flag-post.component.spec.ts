import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagPostComponent } from './flag-post.component';

describe('FlagPostComponent', () => {
  let component: FlagPostComponent;
  let fixture: ComponentFixture<FlagPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
