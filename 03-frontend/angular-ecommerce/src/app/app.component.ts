import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInAnimation, fadeOutAnimation } from 'angular-animations'
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fadeInAnimation({delay: 0}),
    fadeOutAnimation({delay: 800})
]
})
export class AppComponent {
  //title = 'angular-ecommerce';
  showLoader: boolean = true;
  opacity = 1;
  display = "block";

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {}

  // Preventing default behavior of clicking on 'a' tags
  @HostListener('window:click', ['$event'])
  onClick(e: any) {
    const path = e.composedPath() as Array<any>;

    const firstAnchor = path.find(
      (p) => p.tagName && p.tagName.toLowerCase() === 'a'
    );
    if (firstAnchor && !firstAnchor.hasAttribute('routerlink')) {
      const href = firstAnchor.getAttribute('href');

      this.router.navigateByUrl(href);

      e.preventDefault();
    }
  }

  // Adding effects (Source: https://stackblitz.com/edit/angular-animations-delayed-fadein-fadeout)
  @HostListener('window:DOMContentLoaded', ['$event'])
  onDOMContentLoaded(e: any) {
    this.showLoader = false;
    this.opacity = 1;
    this.display = "block"
  }

  fadeOutDone(){
    this.opacity = 0;
    this.display = "none"
  }
}
