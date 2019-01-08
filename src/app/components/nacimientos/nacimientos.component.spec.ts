import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NacimientosComponent } from './nacimientos.component';

describe('NacimientosComponent', () => {
  let component: NacimientosComponent;
  let fixture: ComponentFixture<NacimientosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NacimientosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NacimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
