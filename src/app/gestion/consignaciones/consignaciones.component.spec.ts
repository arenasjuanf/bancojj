import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignacionesComponent } from './consignaciones.component';

describe('ConsignacionesComponent', () => {
  let component: ConsignacionesComponent;
  let fixture: ComponentFixture<ConsignacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
