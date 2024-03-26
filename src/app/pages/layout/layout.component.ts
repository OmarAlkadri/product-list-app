import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';



import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppBarComponent } from '../../components/app-bar/app-bar.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  imports: [RouterOutlet, AppBarComponent,
    MatSidenavModule, MatFormFieldModule, MatSelectModule, MatButtonModule,
    FormsModule,
    CommonModule
  ]
})
export class LayoutComponent {

  currentRoute: string | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {
    // Listen for route changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Store the current route URL
      }
    });
  }
  navigateToProfile() {
    this.router.navigate(['/login']);
  }
}
