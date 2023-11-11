import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'], // Add any custom styling here if needed
})
export class BreadcrumbComponent implements OnInit, OnDestroy {
  breadcrumbs: { label: string; url: string }[] = [];
  constructor(private breadcrumbService: BreadcrumbService) {}

  // breadcrumbs: { label: string; url: string }[] = [];
  // routerSubscription: Subscription;

  // constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  //   // Subscribe to router events to update breadcrumbs whenever the route changes
  //   this.routerSubscription = this.router.events.subscribe((event) => {
  //     if (event instanceof NavigationEnd) {
  //       this.updateBreadcrumbs();
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.breadcrumbs = this.breadcrumbService.getBreadcrumbs();
    this.breadcrumbs = this.breadcrumbs.slice(0, this.breadcrumbs.length - 1); // Remove the last breadcrumb before returning
  }

  ngOnDestroy(): void {
    // this.routerSubscription.unsubscribe();
  }

  // updateBreadcrumbs(): void {
  //   this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
  // }

  // createBreadcrumbs(
  //   route: ActivatedRoute,
  //   url: string = '',
  //   breadcrumbs: { label: string; url: string }[] = []
  // ): { label: string; url: string }[] {
  //   const children: ActivatedRoute[] = route.children;

  //   if (children.length === 0) {
  //     return breadcrumbs;
  //   }

  //   breadcrumbs = [];
  //   for (const child of children) {
  //     const routeURL: string = child.snapshot.url
  //       .map((segment) => segment.path)
  //       .join('/');

  //     if (routeURL !== '') {
  //       url += `/${routeURL}`;
  //     }

  //     breadcrumbs.push({
  //       label: child.snapshot.data['breadcrumb'].label,
  //       url: url,
  //     });

  //     return this.createBreadcrumbs(child, url, breadcrumbs);
  //   }

  //   return breadcrumbs;
  // }
}
