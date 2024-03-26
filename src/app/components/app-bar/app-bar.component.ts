import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css'
})
export class AppBarComponent {
  constructor(private router: Router) { }

  ngOnInit() {
  }



  navbarOpen = false;
  navItems = [
    { name: 'Company', icon: 'fas fa-tachometer-alt', route: '/company' },
    { name: 'Courses', icon: 'far fa-address-book', route: '/courses' },
    { name: 'Wishlist', icon: 'far fa-address-book', route: '/wish-list' },
    { name: 'Cart Details', icon: 'far fa-address-book', route: '/cart-details' },
  ];


  navigate(item: any): any {
    this.router.navigate([item]);
  }

}


