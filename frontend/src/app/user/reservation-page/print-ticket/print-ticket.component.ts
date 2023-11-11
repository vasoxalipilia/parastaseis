import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Ticket } from '../../interfaces/Ticket.interface';
import * as QRCode from 'qrcode';
import { Shipping } from '../../interfaces/shipping.interface';
import { CEvent } from '../../interfaces/event.interface';

@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.scss'],
})
export class PrintTicketComponent implements OnInit, AfterViewInit {
  ticketsLeft: number = 100; // Replace this with the actual tickets left for the event
  data: { event: CEvent; ticket: Ticket; userInformation: Shipping };
  event: CEvent;
  ticket: Ticket;
  shippingInformation: Shipping;
  randomString: string;
  @ViewChild('qrcodeCanvas', { static: true }) qrcodeCanvas: ElementRef;

  constructor(
    private elementRef: ElementRef,
    private cdref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.data = history.state?.data;
    this.event = this.data.event;
    this.ticket = this.data.ticket;
    this.shippingInformation = this.data.userInformation;
  }

  ngAfterViewInit() {
    this.generateRandomString();
    this.shippingInformation = this.data.userInformation;
  }

  generateQRCode(qrCodeValue: string) {
    const canvas = this.qrcodeCanvas.nativeElement;

    QRCode.toCanvas(canvas, qrCodeValue, (error) => {
      if (error) {
        console.error('Error generating QR code:', error);
      } else {
        // console.log('QR code generated successfully!');
      }
    });
  }

  generateRandomString() {
    const length = 10; // You can adjust the length of the random string as needed
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }

    this.randomString = result;

    this.generateQRCode(
      `ticketNo:${this.randomString}, Name:${this.shippingInformation.firstname}, Lastname:${this.shippingInformation.lastname}`
    );
    this.cdref.detectChanges();
  }

  downloadPDF() {
    this.exportToPDF();
  }

  async exportToPDF(): Promise<void> {
    const doc = new jsPDF();
    const ticketElement =
      this.elementRef.nativeElement.querySelector('.ticket');

    // Generate the PDF from the ticket's HTML
    if (ticketElement) {
      const canvas = await html2canvas(ticketElement);
      const imageData = canvas.toDataURL('image/png');
      doc.addImage(imageData, 'PNG', 15, 20, 180, 180);

      // Save the PDF as "concert_ticket.pdf" and offer it for download
      doc.save('concert_ticket.pdf');
    }
  }
}
