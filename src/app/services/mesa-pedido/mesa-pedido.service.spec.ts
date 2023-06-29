import { TestBed } from '@angular/core/testing';

import { MesaPedidoService } from './mesa-pedido.service';

describe('MesaPedidoService', () => {
  let service: MesaPedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesaPedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
