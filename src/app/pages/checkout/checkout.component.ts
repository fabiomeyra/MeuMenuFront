import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

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
