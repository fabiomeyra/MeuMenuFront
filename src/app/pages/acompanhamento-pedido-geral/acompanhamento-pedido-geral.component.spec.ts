import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanhamentoPedidoGeralComponent } from './acompanhamento-pedido-geral.component';

describe('AcompanhamentoPedidoGeralComponent', () => {
  let component: AcompanhamentoPedidoGeralComponent;
  let fixture: ComponentFixture<AcompanhamentoPedidoGeralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcompanhamentoPedidoGeralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcompanhamentoPedidoGeralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
