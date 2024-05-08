import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaMateriasScreenComponent } from './lista-materias-screen.component';

describe('ListaMateriasScreenComponent', () => {
  let component: ListaMateriasScreenComponent;
  let fixture: ComponentFixture<ListaMateriasScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaMateriasScreenComponent]
    });
    fixture = TestBed.createComponent(ListaMateriasScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
