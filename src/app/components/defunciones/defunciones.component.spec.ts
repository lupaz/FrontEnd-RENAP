import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefuncionesComponent } from './defunciones.component';

describe('DefuncionesComponent', () => {
  let component: DefuncionesComponent;
  let fixture: ComponentFixture<DefuncionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefuncionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefuncionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
