import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  // @Input('appDropdown') isOpen = false;

  // constructor(private elementRef: ElementRef) {}

  // @HostListener('document:click', ['$event.target'])
  // onClickOutside(targetElement: any) {
  //   const clickedInside = this.elementRef.nativeElement.contains(targetElement);
  //   this.isOpen = clickedInside;
  // }

  // @HostListener('mouseenter', ['$event'])
  // onMouseEnter(event: MouseEvent) {
  //   this.isOpen = true;
  // }

  // @HostListener('mouseleave', ['$event'])
  // onMouseLeave(event: MouseEvent) {
  //   this.isOpen = false;
  // }

  @Input() dropdownVisible = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    this.dropdownVisible = clickedInside;
    if (!this.dropdownVisible) {
      this.closeDropdown();
    }
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    this.openDropdown();
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.closeDropdown();
  }

  private openDropdown() {
    this.renderer.addClass(
      this.elementRef.nativeElement.querySelector('.menu'),
      'visible'
    );
  }

  private closeDropdown() {
    this.renderer.removeClass(
      this.elementRef.nativeElement.querySelector('.menu'),
      'visible'
    );
  }
}
