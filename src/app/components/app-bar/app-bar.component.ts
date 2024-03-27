import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';


@Component({
  selector: 'app-bar',
  standalone: true,
  imports: [MatMenuModule,MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app-bar.component.html',
  styleUrl: './app-bar.component.css'
})
export class AppBarComponent {
  @ViewChild('menu') public menu: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(item: any): any {
    this.router.navigate([item]);
  }

}


