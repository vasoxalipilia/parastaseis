import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CEvent } from 'src/app/user/interfaces/event.interface';
import { EventService } from '../event.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit, OnDestroy {
  ticketForm: FormGroup;
  isSubmitted = false;
  errorReturned = false;
  eventsSubscription: Subscription;
  submitSubscription: Subscription;
  events: CEvent[];
  @ViewChild('month') month: ElementRef;
  @ViewChild('socialType') socialType: ElementRef;
  @ViewChild('event') event: ElementRef;
  @ViewChild('category') category: ElementRef;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.ticketForm = new FormGroup({
      time: new FormControl(null, {
        validators: [Validators.required],
      }),

      price: new FormControl(null, {
        validators: [Validators.required],
      }),
      seats: new FormControl(null, {
        validators: [Validators.required],
      }),
      day: new FormControl(null, {
        validators: [Validators.required],
      }),
      year: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  ngOnDestroy(): void {
    this.eventsSubscription.unsubscribe();
  }

  getEvents() {
    const category = this.category.nativeElement.value;

    this.eventsSubscription = this.eventService
      .onGetEvents(category)
      .subscribe({
        next: (response) => {
          this.events = response.events;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  resetForm() {
    this.event.nativeElement.value = '';
    this.socialType.nativeElement.value = '';
    this.month.nativeElement.value = '';
  }

  submit(form: FormGroup) {
    this.isSubmitted = true;

    if (form.invalid) {
      console.log('form is invalid!');
      return;
    }

    let ticket = {
      time: form.value.time,
      price: form.value.price,
      seats: form.value.seats,
      date: `${form.value.day}/${this.month.nativeElement.value}/${form.value.year}`,
      socialType: this.socialType.nativeElement.value,
      event: this.event.nativeElement.value,
    };

    this.submitSubscription = this.eventService
      .onSubmitTicket(ticket)
      .subscribe({
        next: (response) => {
          this.ticketForm.reset();
          this.resetForm();
          this.isSubmitted = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }
}
