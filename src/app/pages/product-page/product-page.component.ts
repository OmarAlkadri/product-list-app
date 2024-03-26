import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  data: any

  constructor(private router: Router) {

    const navigation: any = this.router.getCurrentNavigation();
    if (!navigation) {
      this.router.navigate(['home/list']);
    }
    this.data = navigation?.extras?.state ?? null
  }
  ngOnInit() {

  }
}
