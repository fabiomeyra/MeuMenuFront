import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarUsuarioComponent } from './salvar-usuario.component';

describe('CadastroProdutosComponent', () => {
  let component: SalvarUsuarioComponent;
  let fixture: ComponentFixture<SalvarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalvarUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalvarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
