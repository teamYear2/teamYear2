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
    // Navegar a la página principal (si no estamos ya ahí)
    this.router.navigate(['/']).then(() => {
      // Esperar un momento para que la navegación se complete
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
