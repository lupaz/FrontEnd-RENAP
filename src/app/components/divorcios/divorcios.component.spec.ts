import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivorciosComponent } from './divorcios.component';

describe('DivorciosComponent', () => {
  let component: DivorciosComponent;
  let fixture: ComponentFixture<DivorciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivorciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivorciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
