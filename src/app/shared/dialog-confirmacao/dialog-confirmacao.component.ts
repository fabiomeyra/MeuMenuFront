import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dialog-confirmacao',
  templateUrl: './dialog-confirmacao.component.html'
})
export class ConfirmDialogComponent implements OnInit {
  @ViewChild('contentModalConfirm') contentModalConfirm: any;
  @Output() confirmou = new EventEmitter<boolean>();

  @Input() titulo: string | undefined;
  @Input() mensagem: string | undefined;
  @Input() innerHTML: string | undefined;
  @Input() textoBotaoConfirmar: string | undefined;
  @Input() textoBotaoCancelar: string | undefined;
  @Input() esconderBotaoCancelar: string | undefined;
  @Input() esconderBotaoConfirmar: string | undefined;


  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
  }

  abrir() {
    this.modalService.open(this.contentModalConfirm, { centered: true, backdrop: 'static', keyboard: false });
  }

  onConfirm(): void {
    this.confirmou.emit(true);
    this.modalService.dismissAll();
  }

  onDismiss(): void {
    this.confirmou.emit(false);
    this.modalService.dismissAll();
  }
}


export class ConfirmDialogModel {
  public titulo: string | undefined;
  public mensagem: string | undefined;
  public innerHTML: string | undefined;
  public textoBotaoConfirmar: string | undefined;
  public textoBotaoCancelar: string | undefined;
  public esconderBotaoCancelar: string | undefined;
  public esconderBotaoConfirmar: string | undefined;

  constructor(values: object = {}) {
    Object.assign(this, values);
  }
}
