import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDinamicaComponent } from './lista-dinamica.component';

describe('ListaDinamicaComponent', () => {
  let component: ListaDinamicaComponent;
  let fixture: ComponentFixture<ListaDinamicaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDinamicaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDinamicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
