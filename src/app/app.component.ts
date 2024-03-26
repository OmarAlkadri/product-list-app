import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommandColumnService, ContextMenuService, DetailRowService, EditService, ExcelExportService, FilterService, GroupService, PageService, ReorderService, ResizeService, SearchService, SortService, ToolbarService } from '@syncfusion/ej2-angular-grids';
import { products } from './api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [
    ResizeService,
    PageService,
    SortService,
    FilterService,
    GroupService,
    ToolbarService,
    ExcelExportService,
    ContextMenuService,
    EditService,
    CommandColumnService,
    SearchService,
    DetailRowService,
    ReorderService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'angular-foreget-app';
  constructor(private router: Router) { }
  ngOnInit() {
    localStorage.setItem('products', JSON.stringify(products));
    this.router.navigate(['home/list'])
  }
}
