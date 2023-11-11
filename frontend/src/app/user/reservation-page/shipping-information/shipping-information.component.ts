import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../../interfaces/Ticket.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShippingInformationService } from './shipping-information.service';
import { CEvent } from '../../interfaces/event.interface';
import { Shipping } from '../../interfaces/shipping.interface';
import { ReservationPageService } from '../reservation-page.service';

@Component({
  selector: 'app-shipping-information',
  templateUrl: './shipping-information.component.html',
  styleUrls: ['./shipping-information.component.scss'],
})
export class ShippingInformationComponent {
  @ViewChild('cardTypeInput') cardTypeInput: ElementRef;
  @ViewChild('cardTypeText') cardTypeText: ElementRef;
  @ViewChild('checkInput') checkInput: ElementRef;
  @ViewChild('shippingTown') town: ElementRef;
  @ViewChild('cardMonth') cardMonth: ElementRef<HTMLSelectElement>;

  isOpen = false;
  isChecked = false;
  event: CEvent;
  ticket: Ticket;
  data: { event: CEvent; ticket: Ticket };
  cardTypes = [
    { title: 'Visa', value: 'visa' },
    { title: 'American Express', value: 'amex' },
    { title: 'MasterCard', value: 'mastercard' },
    { title: 'Discover', value: 'discover' },
  ];
  ticketsLeft: number = 100; // Replace this with the actual tickets left for the event
  shippingForm: FormGroup;
  isSubmitted = false;
  submitSubsciption: Subscription;
  errorReturned = false;
  userId = localStorage.getItem('userId');

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private shippingInformationService: ShippingInformationService,
    private reservationPageService: ReservationPageService
  ) {}

  ngOnInit() {
    this.data = history.state?.data;
    this.event = this.data.event;
    this.ticket = this.data.ticket;
    if (this.userId) this.userId.replace(/"/g, '');

    this.shippingForm = new FormGroup({
      firstname: new FormControl(null, {
        validators: [Validators.required],
      }),
      lastname: new FormControl(null, {
        validators: [Validators.required],
      }),
      shippingAddress: new FormControl(null, {
        validators: [Validators.required],
      }),
      postalCode: new FormControl(null, {
        validators: [Validators.required],
      }),
      shippingCity: new FormControl(null, {
        validators: [Validators.required],
      }),
      shippingTown: new FormControl(null, {
        validators: [Validators.required],
      }),
      cardType: new FormControl(null, {
        validators: [Validators.required],
      }),
      cardNumber: new FormControl(null, {
        validators: [Validators.required],
      }),
      cardCvc: new FormControl(null, {
        validators: [Validators.required],
      }),
      expirationDate: new FormControl(null, {
        validators: [Validators.required],
      }),
      // asShipping: new FormControl(false, {
      //   validators: [Validators.required],
      // }),
      // receiptFirstname: new FormControl(null, {
      //   validators: [Validators.required],
      // }),
      // receiptLastname: new FormControl(null, {
      //   validators: [Validators.required],
      // }),
      // receiptAddress: new FormControl(null, {
      //   validators: [Validators.required],
      // }),
      // receiptPostalcode: new FormControl(null, {
      //   validators: [Validators.required],
      // }),
      // receiptCity: new FormControl(null, {
      //   validators: [Validators.required],
      // }),
      // receiptTown: new FormControl(null, {
      //   validators: [Validators.required],
      // }),
    });
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;

    if (form.invalid) {
      console.log('form invalid');
      return;
    }

    const shipping: Shipping = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      shippingAddress: form.value.shippingAddress,
      postalCode: form.value.postalCode,
      shippingCity: form.value.shippingCity,
      shippingTown: form.value.shippingTown,
      // cardType: form.value.cardType,
      // cardNumber: form.value.cardNumber,
      // cardCvc: form.value.cardCvc,
      // expirationDate: `${this.cardMonth.nativeElement.value}/${form.value.expirationDate}`,
      // asShipping: this.isChecked,
      // receiptFirstname: form.value.receiptFirstname,
      // receiptLastname: form.value.receiptLastname,
      // receiptAddress: form.value.receiptAddress,
      // receiptPostalcode: form.value.receiptPostalcode,
      // receiptCity: form.value.receiptCity,
      // receiptTown: form.value.receiptTown,
    };

    // if asShipping button is checked, then assign the shipping values to the receipt values
    // if (this.isChecked) {
    //   shipping.receiptFirstname = shipping.firstname;
    //   shipping.receiptLastname = shipping.lastname;
    //   shipping.receiptAddress = shipping.shippingAddress;
    //   shipping.receiptPostalcode = shipping.postalCode;
    //   shipping.receiptCity = shipping.shippingCity;
    //   shipping.receiptTown = shipping.shippingTown;
    // }

    // this.isLoading = true;

    this.submitSubsciption = this.shippingInformationService
      .onSubmit(shipping, this.ticket._id, this.userId)
      .subscribe({
        next: (response) => {
          this.printTicket(this.event, this.ticket, response);
          // localStorage.setItem('user', JSON.stringify(response));
        },
        error: (error) => {
          this.errorReturned = true;
          // .split(':')[1].trim();
          console.error(error);
        },
      });
    // this.isLoading = false;
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  // toggleChecked() {
  //   this.isChecked = !this.isChecked;

  //   if (this.isChecked) {
  //     this.shippingForm.get('receiptFirstname')?.disable();
  //     this.shippingForm.get('receiptLastname')?.disable();
  //     this.shippingForm.get('receiptAddress')?.disable();
  //     this.shippingForm.get('receiptPostalcode')?.disable();
  //     this.shippingForm.get('receiptCity')?.disable();
  //     this.shippingForm.get('receiptTown')?.disable();
  //   } else {
  //     this.shippingForm.get('receiptFirstname')?.enable();
  //     this.shippingForm.get('receiptLastname')?.enable();
  //     this.shippingForm.get('receiptAddress')?.enable();
  //     this.shippingForm.get('receiptPostalcode')?.enable();
  //     this.shippingForm.get('receiptCity')?.enable();
  //     this.shippingForm.get('receiptTown')?.enable();
  //   }
  // }

  previous() {
    this.router.navigate([`${this.event.url}/tickets`], {
      state: { data: { event: this.event, ticket: this.ticket } },
    });
  }

  showSelection(cardType: { title: string; value: string }) {
    this.renderer.setProperty(
      this.cardTypeInput.nativeElement,
      'value',
      cardType.value
    );
    this.renderer.setProperty(
      this.cardTypeText.nativeElement,
      'innerHTML',
      '<i class="cc ' + cardType.value + ' icon"></i>' + cardType.title
    );
    this.renderer.setStyle(
      this.cardTypeText.nativeElement,
      'color',
      'rgba(0, 0, 0, 0.87)'
    );
  }

  printTicket(event: CEvent, ticket: Ticket, userInformation: Shipping) {
    this.reservationPageService
      .updateTicket(event._id, ticket)
      .subscribe({
        next: (response) => {
          this.router.navigate([`${event.url}/printTicket`], {
            state: { data: { event: this.event, ticket, userInformation } },
          });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
