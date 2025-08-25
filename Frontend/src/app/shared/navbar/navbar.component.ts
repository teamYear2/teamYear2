import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class Navbar {

  constructor(private router: Router) {}

  scrollToFooter() {
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const footerElement = document.getElementById('contacto-footer');
        if (footerElement) {
          footerElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    });
  }
}
