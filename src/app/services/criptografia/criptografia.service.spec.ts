import { TestBed } from '@angular/core/testing';

import { CriptografiaService } from './criptografia.service';

describe('criptografiaService', () => {
  let service: CriptografiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CriptografiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
