import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridModule, EditService, ToolbarService, SortService, PageService, EditSettingsModel, ToolbarItems, ContextMenuItem, GridComponent } from '@syncfusion/ej2-angular-grids';
import { DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { AutoCompleteModule } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { products } from '../../api';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponentComponent } from '../../components/dialog-component/dialog-component.component';
import { Store, select } from '@ngrx/store';
import { map } from 'rxjs';
import { DetailsTableComponent } from './details-table/details-table.component';
import { ApiService } from '../../api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    DetailsTableComponent,
    MatSelectModule, MatCardModule, ReactiveFormsModule,
    MatGridListModule,
    CommonModule,
    GridModule,
    DatePickerAllModule,
    TimePickerModule,
    FormsModule,
    TextBoxModule,
    MultiSelectModule,
    AutoCompleteModule,
    CheckBoxModule,
    HttpClientModule,
    DropDownListModule, MatToolbarModule, MatButtonModule, MatIconModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  constructor(private toastr: ToastrService, private apiService: ApiService, private store: Store, public dialog: MatDialog, private router: Router) { }
  @ViewChild('grid') public grid: GridComponent | undefined;
  data: any[] = [];
  public editSettings?: EditSettingsModel;
  public toolbar?: any = ['Add'];
  public orderIDRules?: Object;
  public customerIDRules?: Object;
  public freightRules?: Object;
  public shipCountryRules?: Object;
  public dateRules?: Object;
  public initialSort?: Object;

  ngOnInit() {
    //this.apiService.getServicess('products').subscribe(data => {
    // return this.data = data
    // });
    const storedJsonString = localStorage.getItem('products') ?? '[]'
    this.data = JSON.parse(storedJsonString)

    this.editSettings = {
      allowEditing: false,
      allowAdding: true,
      allowDeleting: false,
      mode: 'Batch',
    };
    this.toolbar = ['Add', 'Search'];
  }

  onSelectChange = (args: any) => {
    if (!this.grid) {
      return;
    }

    const selectedValue = args.value;
    this.grid.clearSorting()
    if (selectedValue === 'upvote') {
      this.grid.sortColumn('upvote', 'Descending', true);
    } else if (selectedValue === 'downvote') {
      this.grid.sortColumn('downvote', 'Descending', true);
    }
  }

  clickHandler = (args: any) => {
    if (args.item.properties.text === 'Add') {
      this.router.navigate(['home/product-adding']);
    }
  }

  EditShipmentItem({ column, index, foreignKeyData, ...tempData }: any) {

    this.router.navigate(['home/product-adding'], {
      state: {
        ...tempData
      }
    });
  }

  dialogConfig = new MatDialogConfig();

  openRemoveDialog(data: any) {
    this.dialogConfig.data = {
      title: 'Remove Item',
      content: `
      <p>
      Are you sure about this process?
  </p>`,
      actions: [
        { label: 'Cancel', value: false },
        { label: 'Ok', value: true, color: 'warn' }
      ]
    };
    const dialogRef = this.dialog.open(DialogComponentComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.RemoveItem(data)
      }
    });
  }

  openDetailsDialog({ column, index, foreignKeyData, ...tempData }: any) {

    this.router.navigate(['home/product-page'], {
      state: {
        ...tempData
      }
    });

    /*this.dialog.open(DialogComponentComponent, {
      data: {
        title: 'Details',
        titleComponent: DetailsTableComponent,
        componentInput: { context: {...tempData} }
      },
    });*/



  }

  RemoveItem(Id: any) {
    const storedJsonString = localStorage.getItem('products') ?? '';
    let jsonData = JSON.parse(storedJsonString);
    const index = jsonData.findIndex((item: any) => item.id === Id);
    if (index !== -1) {
      jsonData.splice(index, 1);
      const updatedJsonString = JSON.stringify(jsonData);
      localStorage.setItem('products', updatedJsonString);
      this.data = jsonData

      this.toastr.success('Remove Product', 'Process Completed!');
    } else
      this.toastr.error('Product Not Found', 'Error');
    this.grid?.refresh()

  }

  upvote: number[] = []
  downvote: number[] = []

  upvoteProduct(productId: any) {
    if (!this.upvote.includes(productId)) {
      this.upvote.push(productId);
      const dataIndex = this.data.findIndex((p) => p.id === productId);
      if (dataIndex !== -1) {
        this.data[dataIndex].upvote++;
      }
    } else {
      const upvoteIndex = this.upvote.findIndex((e) => e === productId);

      this.upvote.splice(upvoteIndex, 1);
      const dataIndex = this.data.findIndex((p) => p.id === productId);
      if (dataIndex !== -1 && this.data[dataIndex].upvote > 0) {
        this.data[dataIndex].upvote--;
      }
    }

    const downvoteIndex = this.downvote.findIndex((e) => e === productId);
    if (downvoteIndex !== -1) {
      this.downvote.splice(downvoteIndex, 1);
      const dataIndex = this.data.findIndex((p) => p.id === productId);
      if (dataIndex !== -1 && this.data[dataIndex].downvote > 0) {
        this.data[dataIndex].downvote--;
      }
    }
    this.grid?.refresh()

  }

  downvoteProduct(productId: any) {
    if (!this.downvote.includes(productId)) {
      this.downvote.push(productId);
      const dataIndex = this.data.findIndex((p) => p.id === productId);
      if (dataIndex !== -1) {
        this.data[dataIndex].downvote++;
      }
    } else {
      const downvoteIndex = this.downvote.findIndex((e) => e === productId);

      this.downvote.splice(downvoteIndex, 1);
      const dataIndex = this.data.findIndex((p) => p.id === productId);
      if (dataIndex !== -1 && this.data[dataIndex].downvote > 0) {
        this.data[dataIndex].downvote--;
      }
    }

    const upvoteIndex = this.upvote.findIndex((e) => e === productId);
    if (upvoteIndex !== -1) {
      this.upvote.splice(upvoteIndex, 1);
      const dataIndex = this.data.findIndex((p) => p.id === productId);
      if (dataIndex !== -1 && this.data[dataIndex].upvote > 0) {
        this.data[dataIndex].upvote--;
      }
    }

    this.grid?.refresh()

  }

  upvoteStyle(id: any): string {
    return this.upvote.find((e) => e === id) ? '#3b55ff' : '#000'
  }

  downvoteStyle(id: any): any {
    return this.downvote.find((e) => e === id) ? '#3b55ff' : '#000'
  }


  contextMenuItems: ContextMenuItem[] = [
    'AutoFit',
    'AutoFitAll',
    'SortAscending',
    'SortDescending',
    'ExcelExport',
    'CsvExport',
    'FirstPage',
    'PrevPage',
    'LastPage',
    'NextPage',
  ]

  pageOptions = {
    pageSize: 5,
    pageSizes: true
  };

  ngOnDestroy(): void {

  }

}
