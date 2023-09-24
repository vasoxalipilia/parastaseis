import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secondary-header',
  templateUrl: './secondary-header.component.html',
  styleUrls: ['./secondary-header.component.scss'],
})
export class SecondaryHeaderComponent implements AfterViewInit {
  @ViewChild('secondary_header') header: ElementRef<HTMLElement>;
  header_items = [
    { title: 'Δημοφιλή', id: 'popular' },
    { title: 'Προτεινόμενα', id: 'recommended' },
    { title: 'Νέα', id: 'news' },
    { title: 'Θέατρο', id: 'theatre' },
    { title: 'Μουσική', id: 'music' },
  ];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  toggleItem(item: any) {
    const children = this.header.nativeElement.children;
    for (let child of children) {
      this.renderer.removeClass(child, 'active');
    }
    this.renderer.addClass(item, 'active');
  }

  scroll(item: string) {
    // console.log(item);
    // this.userService.scrollToSection(item);
  }
}
