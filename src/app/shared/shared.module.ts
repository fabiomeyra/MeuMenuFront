import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule, NgbNavModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// scroll package
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

// component
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { SignmodalComponent } from './signmodal/signmodal.component';
import { LanguageService } from '../services/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogComponent } from './dialog-confirmacao/dialog-confirmacao.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SalvarUsuarioComponent } from '../pages/usuario/salvar/salvar-usuario.component';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SignmodalComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    PaginationComponent,
    SalvarUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbDropdownModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    ScrollToModule.forRoot()
  ],
  providers: [LanguageService],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    ConfirmDialogComponent,
    PaginationComponent
  ]
})
export class SharedModule { }
