import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { MatCardModule } from '@angular/material/card'; // Assuming you're using Angular Material
import { GridModule } from '@syncfusion/ej2-angular-grids'; // For Syncfusion EJ2 Angular Grids
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // For animations

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent], // Component goes under declarations
      imports: [
        MatCardModule, // Import necessary modules here
        GridModule,
        NoopAnimationsModule // Often required for testing components with animations
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
