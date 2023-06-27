import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {

  formData!: UntypedFormGroup;
  submitted = false;

  constructor(public formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    
    // Validation
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      change: ['', [Validators.required]],
      deliverytime: ['', [Validators.required]],
      city: ['', [Validators.required]]
    });
  }

  
  /**
* Returns form
*/
get form() {
  return this.formData.controls;
}


completeorder() {
  this.submitted = true
}

}
