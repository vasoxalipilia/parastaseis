import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EventService } from '../event.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewComponent {
  isSimplePhotoSelected = false;
  isCoverPhotoSelected = false;
  selectedSimpleImageName = '';
  selectedCoverImageName = '';
  selectedSimplePhoto: File | null = null;
  selectedCoverPhoto: File | null = null;
  uploadSubscription: Subscription;
  eventForm: FormGroup;
  isOpen = false;
  isSubmitted = false;
  errorReturned = false;
  submitSubscription: Subscription;
  @ViewChild('simplePhoto') simplePhoto: ElementRef;
  @ViewChild('coverPhoto') coverPhoto: ElementRef;
  @ViewChild('month') month: ElementRef;
  @ViewChild('description') description: ElementRef;
  @ViewChild('category') category: ElementRef;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),

      day: new FormControl(null, {
        validators: [Validators.required],
      }),
      year: new FormControl(null, {
        validators: [Validators.required],
      }),
      location: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  toggleOpen() {
    this.isOpen = !this.isOpen;
  }

  onSimplePhotoChange(event: any) {
    this.isSimplePhotoSelected = false;
    this.selectedSimplePhoto = event.target.files[0] as File;
    this.selectedSimpleImageName = this.selectedSimplePhoto.name;
    this.isSimplePhotoSelected = true;

    // this.uploadPicture(this.selectedFile, this.selectedFileName);
  }

  onCoverPhotoChange(event: any) {
    this.isCoverPhotoSelected = false;
    this.selectedCoverPhoto = event.target.files[0] as File;
    this.selectedCoverImageName = this.selectedCoverPhoto.name;
    this.isCoverPhotoSelected = true;

    // this.uploadPicture(this.selectedFile, this.selectedFileName);
  }

  resetForm() {
    this.description.nativeElement.value = '';
    this.category.nativeElement.value = '';
    this.month.nativeElement.value = '';
    this.selectedSimplePhoto = null;
    this.selectedCoverPhoto = null;
  }

  triggerSimplePhotoInput() {
    // Programmatically trigger the click event of the file input
    const fileInput = this.simplePhoto.nativeElement;
    fileInput.click();
  }

  triggerCoverPhotoInput() {
    // Programmatically trigger the click event of the file input
    const fileInput = this.coverPhoto.nativeElement;
    fileInput.click();
  }

  // uploadPicture(selectedFile: any) {
  //   if (selectedFile) {
  //     this.uploadSubscription = this.eventService
  //       .onUploadPicture(selectedFile)
  //       .subscribe({
  //         next: (response) => {
  //           console.log({ response });
  //         },
  //       });
  //   }
  // }

  submit(form: FormGroup) {
    this.isSubmitted = true;

    if (form.invalid) {
      console.log('form is invalid!');
      return;
    }

    let event;
    if (this.selectedCoverPhoto && this.selectedSimplePhoto) {
      event = {
        title: form.value.title,
        category: this.category.nativeElement.value,
        description: this.description.nativeElement.value,
        url: `/${this.category.nativeElement.value}/reservation`.toLowerCase(),
        date: `${form.value.day}/${this.month.nativeElement.value}/${form.value.year}`,
        location: form.value.location,
        simpleImage: this.selectedSimplePhoto,
        coverImage: this.selectedCoverPhoto,
      };
    }

    this.submitSubscription = this.eventService.onSubmitEvent(event).subscribe({
      next: (response) => {
        this.eventForm.reset();
        this.resetForm();
        this.isSubmitted = false;
      },
      error: (error) => {
        let errorMessage = error.error.message;
        console.error(errorMessage);
      },
    });
  }
}
