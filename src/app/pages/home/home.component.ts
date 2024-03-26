import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private toastr: ToastrService, private apiService: ApiService, private router: Router) { }
  data:any
  ngOnInit() {
  const storedJsonString = localStorage.getItem('products') ?? ''
  this.data = JSON.parse(storedJsonString)
  }
}
