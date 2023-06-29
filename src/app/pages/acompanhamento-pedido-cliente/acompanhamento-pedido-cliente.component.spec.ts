import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanhamentoPedidoClienteComponent } from './acompanhamento-pedido-cliente.component';

describe('AcompanhamentoPedidoClienteComponent', () => {
  let component: AcompanhamentoPedidoClienteComponent;
  let fixture: ComponentFixture<AcompanhamentoPedidoClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompanhamentoPedidoClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcompanhamentoPedidoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
