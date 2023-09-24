import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
// import { MenuItem } from 'primeng/api';

interface MenuItem {
  label: string;
  isDropdownOpen: boolean;
  subItems: {
    label: string;
    routerLink?: string;
  }[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated$: BehaviorSubject<boolean>;
  authSubscription: Subscription;
  userFirstName = localStorage.getItem('firstName');
  isOpen = false;
  isVisible = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.isAuthenticated$ = this.authService.isAuthenticated$;
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: any) {
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    this.isOpen = clickedInside;
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    this.isOpen = true;
  }

  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.isOpen = false;
  }

  toggleDropdown(item: MenuItem) {
    item.isDropdownOpen = !item.isDropdownOpen;
  }

  // isLoggedIn(): boolean {
  //   // return this.authService.isLoggedIn();
  // }

  logout() {
    this.authService.onLogout().subscribe({
      next: (response) => {
        this.authService.onUpdateAuthStatus(false);
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error(error);
      },
    });
    // this.router.navigate(['/login']);
  }

  checkAuth() {
    this.authSubscription = this.authService.isAuth().subscribe((response) => {
      if (response) {
        this.authService.onUpdateAuthStatus(true);
      } else {
        this.authService.onUpdateAuthStatus(false);
      }
    });
  }

  menuItems: MenuItem[] = [
    {
      label: 'Menu 1',
      isDropdownOpen: false,
      subItems: [
        { label: 'Option 1.1' },
        { label: 'Option 1.2' },
        { label: 'Option 1.3' },
      ],
    },
    {
      label: 'Menu 2',
      isDropdownOpen: false,
      subItems: [
        { label: 'Option 2.1' },
        { label: 'Option 2.2' },
        { label: 'Option 2.3' },
      ],
    },

    {
      label: 'Εκδηλώσεις',
      isDropdownOpen: false,
      subItems: [
        {
          label: 'Θέατρο',
          routerLink: '/theatre',
        },
        {
          label: 'Μουσική',
          routerLink: '/music',
        },
        {
          label: 'Νέα',
          routerLink: '/new',
        },
        {
          label: 'Προτεινόμενα',
          routerLink: '/recommended',
        },
        {
          label: 'Δημοφιλή',
          routerLink: '/popular',
        },
      ],
    },
  ];
}
