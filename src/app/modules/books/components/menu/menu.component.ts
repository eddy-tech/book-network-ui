import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    const linkColor = document.querySelectorAll('.nav-link');
    linkColor.forEach((element) => {
      if (window.location.href.endsWith(element.getAttribute('href') || '')) {
        element.classList.add('active');
      }
      element.addEventListener('click', () => {
        linkColor.forEach((element) => {
          element.classList.remove('active');
        });
        element.classList.add('active');
      });
    });
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
    this.router.navigateByUrl('/authentication/login')
  }
}
