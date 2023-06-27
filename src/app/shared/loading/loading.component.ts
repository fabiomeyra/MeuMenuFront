import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  template: `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `,
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {}