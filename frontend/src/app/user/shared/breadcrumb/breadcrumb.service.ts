// breadcrumb.service.ts
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private breadcrumbs: { label: string; url: string }[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = this.createBreadcrumbs(this.router.routerState.root);
      }
    });
  }

  private createBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: { label: string; url: string }[] = []
  ): { label: string; url: string }[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      // Return the breadcrumbs if there are no more child routes
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb']?.label;
      if (label) {
        breadcrumbs.push({ label, url });
      }

      // Continue recursively to the next level of children
      return this.createBreadcrumbs(child, url, breadcrumbs);
    }

    // The function should always return a value, even if it doesn't reach the for loop
    return breadcrumbs;
  }

  getBreadcrumbs(): { label: string; url: string }[] {
    return this.breadcrumbs;
  }
}
