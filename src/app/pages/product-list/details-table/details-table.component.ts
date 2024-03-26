import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-details-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './details-table.component.html',
  styleUrl: './details-table.component.css'
})
export class DetailsTableComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  @Input() context: any;

}
