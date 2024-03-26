import { Component } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Observable, catchError, map } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { productTypes } from '../../utlis/types';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ImageProps } from '../../utlis/product';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
import { Guid } from "guid-typescript";

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { Inject } from '@angular/core';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}


@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [
    MatButtonModule, MatDividerModule, MatIconModule,
    MatSelectModule, MatCardModule,
    ReactiveFormsModule, CommonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
  ],
  templateUrl: './product-add.component.html',
  styleUrl: './product-add.component.css'
})
export class ProductAddComponent {
  [x: string]: any;
  currentRoute: string | undefined;
  productForm: any
  mode: any


  productTypes: any = productTypes


  ngOnInit(): void {

  }


  ngOnDestroy(): void {

  }



  image: ImageProps = {
    previews: '',
    selectedFileName: ''
  }

  data: any
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url; // Store the current route URL
      }
    });
    const navigation: any = this.router.getCurrentNavigation();

    this.data = navigation?.extras?.state ?? null

    this.image.previews = this.data?.imageUrl
    this.image.selectedFileName = ''

    this.productForm = new FormGroup({
      productName: new FormControl(this.data?.name ?? ''),
      description: new FormControl(this.data?.description ?? ''),
      price: new FormControl(this.data?.price ?? ''),
      imageUrl: new FormControl(this.data?.imageUrl ?? ''),
      limit: new FormControl(this.data?.limit ?? ''),
      discount: new FormControl(this.data?.discount ?? 0),
      visible: new FormControl(this.data?.visible ?? true),
      image: new FormControl(this.data?.image ?? ''),
      productType: new FormControl(this.data?.productType ?? ''),
    });
  }



  onSave() {

    if (this.productForm.valid) {

      const tempData: any = { ...this.productForm.value };


      const productItems: any = {
        name: tempData.productName,
        description: tempData.description,
        price: tempData.price,

        imageUrl: this.image.previews,
        limit: tempData.limit,
        discount: tempData.discount,
        productType: tempData.productType,
        visible: tempData.visible,
      }

      if (!this.data) {
        productItems.upvote = 0
        productItems.downvote = 0
        const storedJsonString = localStorage.getItem('products') ?? '';

        let jsonData = JSON.parse(storedJsonString);


        jsonData.push(productItems);

        const updatedJsonString = JSON.stringify(jsonData);

        localStorage.setItem('products', updatedJsonString);

        /* this.apiService.addproducts(productItems).subscribe(data => {
           console.log(data)
         })*/
        this.toastr.success('Add Product', 'Process Completed!');

      }
      else {
        productItems.id = this.data.id
        productItems.upvote = this.data.upvote
        productItems.downvote = this.data.downvote
        /* this.apiService.updateproducts(productItems, this.data.id).subscribe({
           next: data => {
             // Handle successful response
           },
           error: error => {
             // Handle error response
             console.error('Failed to update product', error);
           }
         });*/

        const storedJsonString = localStorage.getItem('products') ?? '';

        let jsonData = JSON.parse(storedJsonString);


        const index = jsonData.findIndex((e: any) => e.id === productItems.id);
        jsonData[index] = productItems;

        const updatedJsonString = JSON.stringify(jsonData);

        localStorage.setItem('products', updatedJsonString);

        this.toastr.success('Edite Product', 'Process Completed!');

      }

      setTimeout(() => {
        this.router.navigate(['home/product-list'])

      }, 1000)

    } else {
      this.productForm.markAllAsTouched();
    }
  }



  selectFiles(event: any): void {

    if (event.target.files && event.target.files[0]) {

      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.image.previews = e.target.result
      };

      reader.readAsDataURL(event.target.files[0]);

      this.image.selectedFileName = event.target.files[0].name;
    }
  }



  onCancel() {
    this.productForm.reset();
    this.data = null
  }

  getFormItem(value: any) {
    return this.productForm?.get(value);
  }

}
