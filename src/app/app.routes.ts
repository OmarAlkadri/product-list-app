import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductAddComponent } from './pages/product-add/product-add.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    //{ path: 'login', component: LoginComponent },
    //{ path: 'create-user', component: createUser, canActivate: [authFunctionGuard] },
    {
        path: 'home', component: LayoutComponent,
        children: [
            {
                path: 'list',
                //canActivate: [authFunctionGuard] ,
                component: HomeComponent,
                //loadChildren: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent)
            },
            {
                path: 'product-list',
                //canActivate: [authFunctionGuard] ,
                component: ProductListComponent,
                //loadChildren: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent)
            },
            {
                path: 'product-adding',
                //canActivate: [authFunctionGuard] ,
                component: ProductAddComponent,
                //loadChildren: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent)
            },
            {
                path: 'product-page',
                //canActivate: [authFunctionGuard] ,
                component: ProductPageComponent,
                //loadChildren: () => import('./pages/product-list/product-list.component').then(m => m.ProductListComponent)
            },
        ],
    },
    { path: '', redirectTo: '/home/product-list', pathMatch: 'full' }
];
