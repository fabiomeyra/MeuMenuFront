import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { UsuarioService } from 'src/app/services/usuario/usuario.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() current: number = 0
  @Input() totalRecords: number = 0
  @Input() perPage: number = 0

  @Output() goTo: EventEmitter<number> = new EventEmitter<number>()
  @Output() next: EventEmitter<number> = new EventEmitter<number>()
  @Output() previous: EventEmitter<number> = new EventEmitter<number>()

  public pages: any[] = []

  public isCollapsed = true;
  totalPages = 0;
  formData!: UntypedFormGroup;
  signupformData!: UntypedFormGroup;
  signupPassfield!: boolean;
  fieldTextType: any;
  submitted = false;
  signupsubmit = false;
  selectedLocation: any;
  carts: any;
  term:any;
  
  constructor(
    ) {
  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      (changes['current'] && changes['current'].currentValue) ||
      (changes['total'] && changes['total'].currentValue)
    ) {
      this.totalPages = Math.ceil(this.totalRecords / this.perPage)
      this.pages = this.getPages(this.current, this.totalPages)
    }
  }

  public onGoTo(page: number): void {
    this.goTo.emit(page)
  }
  public onNext(): void {
    this.next.emit(this.current)
  }
  public onPrevious(): void {
    this.previous.next(this.current)
  }

  private getPages(current: number, total: number): any[] {
    if (total <= 7) {
      return [...Array(total).keys()].map(x => ++x)
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
      } else {
        return [1, '...', current - 1, current, current + 1, '...', total]
      }
    }

    return [1, 2, 3, 4, 5, '...', total]
  }

}
