import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  constructor() {}
  isSmallScreen = window.matchMedia('(max-width: 768px)').matches;
}
