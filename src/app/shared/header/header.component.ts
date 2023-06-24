import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';
import { SignmodalComponent } from '../signmodal/signmodal.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { cartdata } from 'src/app/pages/cart/data';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  formData!: UntypedFormGroup;
  signupformData!: UntypedFormGroup;
  signupPassfield!: boolean;
  fieldTextType: any;
  submitted = false;
  signupsubmit = false;
  selectedLocation: any;
  carts: any;
  total: any = 0;
  term:any;
  
  constructor(public formBuilder: UntypedFormBuilder,
    private modalService: NgbModal,
    public translate: TranslateService,
    public router: Router) {
      translate.setDefaultLang('en');
  }

  ngOnInit(): void {

    this.selectedLocation = 'New York',
      this.carts = cartdata


    // Validation
    this.formData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.signupformData = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

  }

  // calculate cart total
  calculatetotal(total: any) {
    this.total = 0
    this.carts.forEach((element: any) => {
      this.total += parseFloat(element.price)
    });
    return this.total.toFixed(2)
  }

  // set location
  ChangeLocation(location: any) {
    this.selectedLocation = location
  }

  /**
  * Open modal
  */
  openModal() {
    // this.submitted = false;
    this.modalService.open(SignmodalComponent, { size: 'md', centered: true });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType
  }

  /**
 * Password Hide/Show
 */
  togglesignupPassfield() {
    this.signupPassfield = !this.signupPassfield;
  }

  /**
 * Returns form
 */
  get form() {
    return this.formData.controls;
  }

  /**
 * Returns signup form
 */
  get signupform() {
    return this.signupformData.controls;
  }

  /**
 * submit signin form
 */
  signin() {
    if (this.formData.valid) {
      const message = this.formData.get('email')!.value;
      const pwd = this.formData.get('password')!.value;
      this.modalService.dismissAll();
    }
    this.submitted = true;
  }

  signup() {
    if (this.signupformData.valid) {
      const message = this.signupformData.get('email')!.value;
      const pwd = this.signupformData.get('password')!.value;
      this.modalService.dismissAll();
    }
    this.signupsubmit = true;
  }

  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.querySelector('.navbar-sticky');
    if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
      navbar?.classList.add('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.add('show');
    }
    else {
      navbar?.classList.remove('navbar-stuck');
      document.querySelector(".btn-scroll-top")?.classList.remove('show');
    }
  }

  // remove from cart
  removecart(i: any) {
    this.total -= parseFloat(this.carts[i].price)
    this.total = this.total.toFixed(2)
    this.carts.splice(i, 1)
  }
  

}
