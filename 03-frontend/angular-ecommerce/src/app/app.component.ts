import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-ecommerce';

  constructor(private router: Router) {}

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
}
